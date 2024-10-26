'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plane } from "lucide-react"

export default function HomePage() {
    const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false)
    const [tripCode, setTripCode] = useState("")
    const [error, setError] = useState("")

    const handleJoinTrip = (e: React.FormEvent) => {
        e.preventDefault()
        if (tripCode.length !== 8) {
            setError("Trip code must be 8 characters long")
        } else {
            setError("")
            // Here you would typically handle the trip joining logic
            console.log("Joining trip with code:", tripCode)
            setIsJoinDialogOpen(false)
        }
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <header className="w-full py-6 px-4 sm:px-6 lg:px-8 border-b">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Plane className="h-8 w-8 text-primary" />
                        <span className="text-2xl font-bold text-primary">Trip Together</span>
                    </div>
                </div>
            </header>

            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl font-extrabold text-primary sm:text-5xl md:text-6xl">
                        Plan Your Commute with Trip Together
                    </h1>
                    <p className="mt-6 text-xl text-muted-foreground">
                        TripTogether makes group commutes easy to plan and organize. Create a room for your trip, share a link or code, and form groups by destination and transport type—no accounts required! See all your travel companions in one place and enjoy a simpler, shared journey.
                    </p>
                    <div className="mt-10 space-x-4">
                        <Button size="lg" className="text-lg px-8 py-3">
                            Create New Room
                        </Button>
                        <Dialog open={isJoinDialogOpen} onOpenChange={setIsJoinDialogOpen}>
                            <DialogTrigger asChild>
                                <Button size="lg" variant="outline" className="text-lg px-8 py-3">
                                    Join Room
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Join a Room</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleJoinTrip} className="space-y-4">
                                    <Input
                                        placeholder="Enter 8-character trip code"
                                        value={tripCode}
                                        onChange={(e) => setTripCode(e.target.value)}
                                        maxLength={8}
                                    />
                                    {error && <p className="text-sm text-red-500">{error}</p>}
                                    <Button type="submit" className="w-full">Join Room</Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </main>

            <footer className="w-full py-6 px-4 sm:px-6 lg:px-8 border-t">
                <div className="container mx-auto text-center text-muted-foreground">
                    © 2024 Trip Together. All rights reserved.
                </div>
            </footer>
        </div>
    )
}