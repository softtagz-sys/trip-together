export default function RoomPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl font-extrabold text-primary sm:text-5xl md:text-6xl">
                        Welcome to the Room
                    </h1>
                    <p className="mt-6 text-xl text-muted-foreground">
                        This is the room page. Here you can chat with your friends.
                    </p>
                </div>
            </main>
        </div>
    );
}