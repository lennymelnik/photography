"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, ArrowLeft, ArrowRight, MapPin } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

// Street photography collection with mixed orientations
var photos = [
  {
    id: 1,
    src: "/images/DSCF2795.jpg",
    alt: "Two people leaning on a subway column from opposite sides as the 6 train arrives.",
    title: "Two Strangers Same Idea",
    location: "Grand Central 6 Train Platform",
  },
  {
    id: 2,
    src: "/images/IMG_0333.jpg",
    alt: "A clean, classic street scene capturing the essence of urban life.",
    title: "Clean Classic",
    location: "32nd Street",
  },
  {
    id: 3,
    src: "/images/DSCF2205.jpg",
    alt: "A modern interpretation of the classic cowboy in an urban setting.",
    title: "Modern Cowboy",
    location: "K-Town",
  },
  {
    id: 4,
    src: "/images/DSCF2464.jpg",
    alt: "Steam and smoke rising from the city streets creating an atmospheric scene.",
    title: "City Smoke",
    location: "Manhattan",
  },
  {
    id: 5,
    src: "/images/DSCF2497.jpg",
    alt: "The energy and movement of New York City street life.",
    title: "Urban Energy",
    location: "Midtown",
  },
  {
    id: 6,
    src: "/images/DSCF2517-2.jpg",
    alt: "A candid moment captured between destinations.",
    title: "Between Stops",
    location: "Underground",
  },
  {
    id: 7,
    src: "/images/DSCF2602.jpg",
    alt: "Two people sharing a quiet conversation in the morning rush.",
    title: "Morning Chat",
    location: "Grand Central",
  },
  {
    id: 8,
    src: "/images/DSCF2758.jpg",
    alt: "Navigation and direction in the urban maze.",
    title: "How to get where you are going",
    location: "Grand Central",
  },
  {
    id: 9,
    src: "/images/DSCF2755.jpg",
    alt: "The beginning of a journey through the city.",
    title: "A trip",
    location: "Grand Central",
  },
  {
    id: 10,
    src: "/images/DSCF2694.jpg",
    alt: "Patience in the daily rhythm of city commuting.",
    title: "Waiting In Line",
    location: "Grand Central",
  },
  {
    id: 11,
    src: "/images/DSCF2831.jpg",
    alt: "The constant flow and movement of urban life.",
    title: "City Flow",
    location: "Downtown",
  },
  {
    id: 12,
    src: "/images/DSCF2854.jpg",
    alt: "Street life captured in its natural state.",
    title: "Natural Moment",
    location: "Brooklyn",
  },
  {
    id: 13,
    src: "/images/DSCF2906.jpg",
    alt: "An upward perspective on urban architecture and human scale.",
    title: "Rise Up",
    location: "Madison Park",
  },
  {
    id: 14,
    src: "/images/DSCF2930.jpg",
    alt: "The art of waiting in New York's iconic delicatessen.",
    title: "Patience",
    location: "Katz Delicatessen",
  },
  {
    id: 15,
    src: "/images/DSCF2938.jpg",
    alt: "A worker's focused moment in the urban landscape.",
    title: "Cutter #5",
    location: "Lower East Side",
  },
  {
    id: 16,
    src: "/images/IMG_0470.jpg",
    alt: "Life at the intersection of New York's busiest avenue.",
    title: "The Corner",
    location: "5th Ave",
  },
]

export default function StreetPhotography() {
  const [selectedPhoto, setSelectedPhoto] = useState<(typeof photos)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (photo: (typeof photos)[0]) => {
    setSelectedPhoto(photo)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedPhoto(null)
  }

  const navigatePhoto = (direction: "prev" | "next") => {
    if (!selectedPhoto) return

    const currentIndex = photos.findIndex((photo) => photo.id === selectedPhoto.id)
    let newIndex

    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : photos.length - 1
    } else {
      newIndex = currentIndex < photos.length - 1 ? currentIndex + 1 : 0
    }

    setSelectedPhoto(photos[newIndex])
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isModalOpen) return

      switch (event.key) {
        case "ArrowLeft":
          navigatePhoto("prev")
          break
        case "ArrowRight":
          navigatePhoto("next")
          break
        case "Escape":
          closeModal()
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isModalOpen, selectedPhoto])

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="px-6 py-12 max-w-7xl mx-auto">
        <div className="border-b border-zinc-200 pb-8">
          <h1 className="text-5xl md:text-7xl font-light tracking-tight text-zinc-900 mb-2">STREETS</h1>
          <div className="flex items-center justify-between">
            <p className="text-zinc-600 text-lg font-light">New York City</p>
            <p className="text-zinc-400 text-sm uppercase tracking-wider">2025</p>
          </div>
        </div>
      </header>

      {/* Gallery - Masonry Layout */}
      <main className="px-6 pb-20 max-w-7xl mx-auto">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className="group cursor-pointer break-inside-avoid mb-6"
              onClick={() => openModal(photo)}
            >
              <div className="relative overflow-hidden bg-zinc-100 rounded-sm">
                <Image
                  src={(photo.src ? photo.src.replace("images/", "images/reduced/") : null) || "/placeholder.svg"}
                  alt={photo.alt}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-105 group-hover:contrast-110"
                  quality={85}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ aspectRatio: "auto" }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
              </div>

              {/* Photo info below image */}
              <div className="pt-3 pb-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-zinc-900 font-medium text-base">{photo.title}</h3>
                    <p className="text-zinc-500 text-sm font-light">{photo.location}</p>
                  </div>
                  <span className="text-zinc-300 text-xs font-mono">{String(index + 1).padStart(2, "0")}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Enhanced Modal Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-none w-screen h-screen bg-black border-none p-0 rounded-none">
          <div className="relative w-full h-full flex flex-col">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-50 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all duration-200"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Photo Counter */}
            <div className="absolute top-4 left-4 z-50 px-4 py-2 rounded-full bg-black/50 text-white text-sm font-mono">
              {selectedPhoto && `${photos.findIndex((p) => p.id === selectedPhoto.id) + 1} / ${photos.length}`}
            </div>

            {/* Main Image Container */}
            <div className="flex-1 flex items-center justify-center p-4 relative">
              {selectedPhoto && (
                <>
                  {/* Navigation Buttons */}
                  <button
                    onClick={() => navigatePhoto("prev")}
                    className="absolute left-6 top-1/2 -translate-y-1/2 z-40 p-4 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all duration-200"
                  >
                    <ArrowLeft className="h-6 w-6" />
                  </button>

                  <button
                    onClick={() => navigatePhoto("next")}
                    className="absolute right-6 top-1/2 -translate-y-1/2 z-40 p-4 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all duration-200"
                  >
                    <ArrowRight className="h-6 w-6" />
                  </button>

                  {/* Main Image */}
                  <Image
                    src={selectedPhoto.src || "/placeholder.svg"}
                    alt={selectedPhoto.alt}
                    width={1200}
                    height={800}
                    className="max-w-[calc(100%-8rem)] max-h-[calc(100%-8rem)] w-auto h-auto object-contain"
                    quality={100}
                    priority
                    style={{ aspectRatio: "auto" }}
                  />
                </>
              )}
            </div>

            {/* Bottom Info Bar */}
            {selectedPhoto && (
              <div className="bg-black/80 backdrop-blur-sm text-white p-6 border-t border-white/10">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-light mb-2">{selectedPhoto.title}</h2>
                    <div className="flex items-center gap-2 text-white/70">
                      <MapPin className="h-4 w-4" />
                      <span>{selectedPhoto.location}</span>
                    </div>
                  </div>
                  {selectedPhoto.alt && (
                    <div className="md:max-w-md">
                      <p className="text-white/80 text-sm leading-relaxed">{selectedPhoto.alt}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Keyboard Hints */}
            <div className="absolute bottom-20 right-6 text-white/50 text-xs space-y-1 hidden md:block">
              <div>← → Navigate</div>
              <div>ESC Close</div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="px-6 py-8 max-w-7xl mx-auto border-t border-zinc-200">
        <div className="flex items-center justify-between text-sm text-zinc-500">
          <p>© 2025 Leonard Melnik Photography Collection</p>
          <p className="font-mono">NYC</p>
        </div>
      </footer>
    </div>
  )
}
