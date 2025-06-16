"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, ArrowLeft, ArrowRight, MapPin } from "lucide-react"
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog"

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
    src: "/images/DSCF2891.jpg",
    alt: "A powerful moment of civic engagement captured on the streets.",
    title: "Signs of Protest",
    location: "K-Town",
  },
  {
    id: 5,
    src: "/images/IMG_0497.jpg",
    alt: "A vehicle departing from the urban landscape.",
    title: "Pulling Out",
    location: "Madison Park",
  },
  {
    id: 6,
    src: "/images/IMG_0527.jpg",
    alt: "Looking up at the towering architecture that defines the city skyline.",
    title: "Sky Scraper",
    location: "Madison Park",
  },
 {
    id: 7,
    src: "/images/IMG_0470.jpg",
    alt: ".",
    title: "The Corner",
    location: "5th Ave",
  },
  {
    id: 8,
    src: "/images/IMG_0702.jpg",
    alt: "A man stumbling",
    title: "Stumbling",
    location: "31st Street",
  },
  {
    id: 9,
    src: "/images/DSCF2464.jpg",
    alt: "Steam and smoke rising from the city streets creating an atmospheric scene.",
    title: "City Smoke",
    location: "Manhattan",
  },
  {
    id: 10,
    src: "/images/DSCF2497.jpg",
    alt: "The energy and movement of New York City street life.",
    title: "Urban Energy",
    location: "Midtown",
  },
  {
    id: 11,
    src: "/images/DSCF2517-2.jpg",
    alt: "A candid moment captured between destinations.",
    title: "Between Stops",
    location: "Underground",
  },
  {
    id: 12,
    src: "/images/DSCF2602.jpg",
    alt: "Two people sharing a quiet conversation in the morning rush.",
    title: "Morning Chat",
    location: "Grand Central",
  },
  {
    id: 13,
    src: "/images/DSCF2938.jpg",
    alt: "A worker's focused moment in the urban landscape.",
    title: "Cutter #5",
    location: "Katz Delicatessen",
  },

  {
    id: 14,
    src: "/images/DSCF2755.jpg",
    alt: "The beginning of a journey through the city.",
    title: "A trip",
    location: "Grand Central",
  },
  {
    id: 15,
    src: "/images/DSCF2694.jpg",
    alt: "Patience in the daily rhythm of city commuting.",
    title: "Waiting In Line",
    location: "Grand Central",
  },

  {
    id: 16,
    src: "/images/DSCF2854.jpg",
    alt: "Street life captured in its natural state.",
    title: "Natural Moment",
    location: "Brooklyn",
  },
  {
    id: 17,
    src: "/images/DSCF2906.jpg",
    alt: "An upward perspective on urban architecture and human scale.",
    title: "Rise Up",
    location: "Madison Park",
  },
  {
    id: 18,
    src: "/images/DSCF2930.jpg",
    alt: "The art of waiting in New York's iconic delicatessen.",
    title: "Patience",
    location: "Katz Delicatessen",
  },
    {
    id: 19,
    src: "/images/DSCF2758.jpg",
    alt: "Navigation and direction in the urban maze.",
    title: "How to get where you are going",
    location: "Grand Central",
  },
  
 
    {
    id: 20,
    src: "/images/IMG_0673.jpg",
    alt: "A homeless person sleeping across the street from a luxury furniture showroom",
    title: "Homeless outside store",
    location: "32nd Street",
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

      {/* Fixed Modal Dialog - Single Close Button */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-none w-full h-full max-h-screen bg-white border-none p-0 rounded-none overflow-hidden">
          <div className="relative w-full h-full flex flex-col overflow-hidden">
            {/* Single Close Button - Top Right */}
            <DialogClose asChild>
              {/* <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-50 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white transition-all duration-200 backdrop-blur-sm"
              >
                <X className="h-6 w-6" />
              </button> */}
            </DialogClose>


            {/* Photo Counter - Top Left */}
            <div className="absolute top-4 left-4 z-50 px-4 py-2  text-black text-sm font-mono backdrop-blur-sm">
              {selectedPhoto && `${photos.findIndex((p) => p.id === selectedPhoto.id) + 1} / ${photos.length}`}
            </div>

            {/* Main Image Container - Properly Constrained */}
            <div
              className="flex-1 flex items-center justify-center relative overflow-hidden"
              style={{ height: "calc(100vh - 140px)" }}
            >
              {selectedPhoto && (
                <>
                  {/* Navigation Buttons */}
                  <button
                    onClick={() => navigatePhoto("prev")}
                    className="absolute left-4 md:left-6 bottom-6 -translate-y-1/2 z-40 p-3 md:p-4 rounded-full bg-black/60 hover:bg-black/80 text-white transition-all duration-200 backdrop-blur-sm"
                  >
                    <ArrowLeft className="h-5 w-5 md:h-6 md:w-6" />
                  </button>

                  <button
                    onClick={() => navigatePhoto("next")}
                    className="absolute right-4 md:right-6 bottom-6 -translate-y-1/2 z-40 p-3 md:p-4 rounded-full bg-black/60 hover:bg-black/80 text-white transition-all duration-200 backdrop-blur-sm"
                  >
                    <ArrowRight className="h-5 w-5 md:h-6 md:w-6" />
                  </button>

                  {/* Main Image - Properly Sized */}
                  <div className="w-full h-full flex items-center justify-center p-4 md:p-8">
                    <Image
                  src={(selectedPhoto.src ? selectedPhoto.src.replace("images/", "images/normal/") : null) || "/placeholder.svg"}
                      alt={selectedPhoto.alt}
                      width={1200}
                      height={800}
                      className="max-w-full max-h-full w-auto h-auto object-contain"
                      quality={100}
                      priority
                      style={{ aspectRatio: "auto" }}
                    />
                  </div>
                </>
              )}
            </div>

            {/* Bottom Info Bar - Fixed Height */}
            {selectedPhoto && (
              <div
                className="bg-black/90 backdrop-blur-sm text-white border-t border-white/10"
                style={{ height: "80px" }}
              >
                <div className="h-full flex items-center px-4 md:px-6">
                  <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h2 className="text-lg md:text-xl font-light mb-1 truncate">{selectedPhoto.title}</h2>
                      <div className="flex items-center gap-2 text-white/70">
                        <MapPin className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate text-sm md:text-base">{selectedPhoto.location}</span>
                      </div>
                    </div>

                    {/* Keyboard Hints - Desktop Only */}
                    <div className="hidden lg:flex items-center gap-4 text-white/50 text-xs ml-6">
                      <span>← → Navigate</span>
                      <span>ESC Close</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
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
