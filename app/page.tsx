"use client"

import { useState } from "react"
import Image from "next/image"
import { X, ArrowLeft, ArrowRight } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

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
    alt: "",
    title: "Clean Classic",
    location: "32nd Street",
  },
  {
    id: 3,
    src: "/images/DSCF2205.jpg",
    alt: "",
    title: "Modern Cowboy",
    location: "K-Town",
  },
  {
    id: 4,
    src: "/images/DSCF2464.jpg",
    alt: "",
    title: "City Smoke",
    location: "",
  },
  {
    id: 5,
    src: "/images/DSCF2497.jpg",
    alt: "",
    title: "",
    location: "",
  },
  {
    id: 6,
    src: "/images/DSCF2517-2.jpg",
    alt: "",
    title: "Untitiled",
    location: "",
  },
  {
    id: 7,
    src: "/images/DSCF2602.jpg",
    alt: "",
    title: "Morning Chat",
    location: "Grand Central",
  },
  {
    id: 8,
    src: "/images/DSCF2758.jpg",
    alt: "",
    title: "How to get where you are going",
    location: "Grand Central",
  },
  {
    id: 9,
    src: "/images/DSCF2755.jpg",
    alt: "",
    title: "A trip",
    location: "Grand Central",
  },
  {
    id: 10,
    src: "/images/DSCF2694.jpg",
    alt: "",
    title: "Waiting In Line",
    location: "Grand Central",
  },


  {
    id: 11,
    src: "/images/DSCF2831.jpg",
    alt: "",
    title: "",
    location: "",
  },
  {
    id: 12,
    src: "/images/DSCF2854.jpg",
    alt: "",
    title: "",
    location: "",
  },
  {
    id: 13,
    src: "/images/DSCF2906.jpg",
    alt: "",
    title: "Rise Up",
    location: "Madison Park",
  },
  {
    id: 14,
    src: "/images/DSCF2930.jpg",
    alt: "",
    title: "Patience",
    location: "Katz Delicatessen",
  },
  {
    id: 15,
    src: "/images/DSCF2938.jpg",
    alt: "",
    title: "Cutter #5",
    location: "",
  },
 


  {
    id: 16,
    src: "/images/IMG_0470.jpg",
    alt: "",
    title: "The Corner",
    location: "5th Ave",
  }
];

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
        <div className="columns- md:columns-2 lg:columns-3 gap-6 space-y-6">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className="group cursor-pointer break-inside-avoid mb-6"
              onClick={() => openModal(photo)}
            >
              <div className="relative overflow-hidden bg-zinc-100 rounded-sm">
                <Image
                  src={(photo.src?photo.src.replace('images/','images/reduced/'):null) || "/placeholder.svg"}
                  alt={photo.alt}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-105 group-hover:contrast-110"
                  quality={0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ aspectRatio: "auto" }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />

                {/* Overlay info on hover */}
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-medium text-lg mb-1">{photo.title}</h3>
                    <p className="text-sm text-white/80">{photo.location}</p>
                  </div>
                </div> */}
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

      {/* Modal */}
      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        {/* <DialogTitle>View Photo</DialogTitle> */}
        <DialogContent className="max-w-none w-screen h-screen bg-white border-none p-0 rounded-none">
          <div className="relative w-full h-full flex flex-col md:flex-row">
            {/* Image Section */}
            <div className="flex-1 flex items-center justify-center bg-zinc-50 p-4 sm:p-6 md:p-12 overflow-hidden">
              {selectedPhoto && (
                <div className="relative w-full h-full flex items-center justify-center max-h-[calc(100vh-6rem)]">
                  {/* Navigation Buttons - Overlay on image */}
                  <button
                    onClick={() => navigatePhoto("prev")}
                    className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-40 p-2 sm:p-3 rounded-full bg-white/90 hover:bg-white text-zinc-600 hover:text-zinc-900 transition-all duration-200 shadow-lg"
                  >
                    <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>

                  <button
                    onClick={() => navigatePhoto("next")}
                    className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-40 p-2 sm:p-3 rounded-full bg-white/90 hover:bg-white text-zinc-600 hover:text-zinc-900 transition-all duration-200 shadow-lg"
                  >
                    <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>

                  <Image
                    src={selectedPhoto.src || "/placeholder.svg"}
                    alt={selectedPhoto.alt}
                    width={1200}
                    height={800}
                    className="max-w-[calc(100%-2rem)] max-h-[calc(100%-2rem)] w-auto h-auto object-contain"
                    quality={100}
                    priority
                    style={{ aspectRatio: "auto" }}
                  />
                </div>
              )}
            </div>

            {/* Info Panel */}
            <div className="w-full md:w-80 bg-white border-t md:border-t-0 md:border-l border-zinc-200 flex flex-col max-h-[40%] md:max-h-full overflow-y-auto">
              {/* Header */}
              <div className="p-4 sm:p-6 border-b border-zinc-200 flex items-center justify-between">
                <div className="text-xs sm:text-sm font-mono text-zinc-400 uppercase tracking-wider">
                  {selectedPhoto && `${photos.findIndex((p) => p.id === selectedPhoto.id) + 1} / ${photos.length}`}
                </div>
              </div>

              {/* Photo Info */}
              {selectedPhoto && (
                <div className="p-4 sm:p-6 flex-1">
                  <h2 className="text-xl sm:text-2xl font-light text-zinc-900 mb-2">{selectedPhoto.title}</h2>
                  <p className="text-zinc-600 mb-4 sm:mb-6">{selectedPhoto.location}</p>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    {selectedPhoto.alt}
                  </p>
                </div>
              )}
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
