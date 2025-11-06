"use client"

import * as React from "react"
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface VoiceInputProps {
  onTranscript: (text: string) => void
  disabled?: boolean
}

export function VoiceInput({ onTranscript, disabled }: VoiceInputProps) {
  const [isListening, setIsListening] = React.useState(false)
  const [isSupported, setIsSupported] = React.useState(true)
  const recognitionRef = React.useRef<any>(null)
  const { toast } = useToast()

  React.useEffect(() => {
    // Check if browser supports speech recognition
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (!SpeechRecognition) {
        setIsSupported(false)
        return
      }

      const recognition = new SpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = "en-IN" // Indian English

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        onTranscript(transcript)
        setIsListening(false)
      }

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error)
        setIsListening(false)
        toast({
          title: "Voice input error",
          description: "Could not capture voice input. Please try again.",
          variant: "destructive",
        })
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognitionRef.current = recognition
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [onTranscript, toast])

  const toggleListening = () => {
    if (!recognitionRef.current) return

    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      try {
        recognitionRef.current.start()
        setIsListening(true)
        toast({
          title: "Listening...",
          description: "Speak now to input your question",
        })
      } catch (error) {
        console.error("Error starting recognition:", error)
        toast({
          title: "Error",
          description: "Could not start voice input",
          variant: "destructive",
        })
      }
    }
  }

  if (!isSupported) {
    return null
  }

  return (
    <Button
      type="button"
      variant={isListening ? "default" : "ghost"}
      size="icon"
      onClick={toggleListening}
      disabled={disabled}
      className={isListening ? "animate-pulse" : ""}
    >
      {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
      <span className="sr-only">{isListening ? "Stop listening" : "Start voice input"}</span>
    </Button>
  )
}

interface VoiceOutputProps {
  text: string
  autoPlay?: boolean
}

export function VoiceOutput({ text, autoPlay = false }: VoiceOutputProps) {
  const [isSpeaking, setIsSpeaking] = React.useState(false)
  const [isSupported, setIsSupported] = React.useState(true)
  const { toast } = useToast()

  React.useEffect(() => {
    if (typeof window !== "undefined" && !window.speechSynthesis) {
      setIsSupported(false)
    }
  }, [])

  React.useEffect(() => {
    if (autoPlay && text && isSupported) {
      speak()
    }
  }, [text, autoPlay, isSupported])

  const speak = () => {
    if (!isSupported || !text) return

    // Cancel any ongoing speech
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = "en-IN"
    utterance.rate = 0.9
    utterance.pitch = 1

    utterance.onstart = () => {
      setIsSpeaking(true)
    }

    utterance.onend = () => {
      setIsSpeaking(false)
    }

    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event)
      setIsSpeaking(false)
      toast({
        title: "Voice output error",
        description: "Could not play voice output",
        variant: "destructive",
      })
    }

    window.speechSynthesis.speak(utterance)
  }

  const stop = () => {
    window.speechSynthesis.cancel()
    setIsSpeaking(false)
  }

  if (!isSupported) {
    return null
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={isSpeaking ? stop : speak}
      className={isSpeaking ? "animate-pulse" : ""}
    >
      {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      <span className="sr-only">{isSpeaking ? "Stop speaking" : "Read aloud"}</span>
    </Button>
  )
}
