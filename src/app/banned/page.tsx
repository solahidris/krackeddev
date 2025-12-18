import { ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function BannedPage() {
    return (
        <main className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
            <div className="bg-red-950/20 border-2 border-red-800 p-8 rounded-lg max-w-md w-full text-center space-y-6">
                <div className="flex justify-center">
                    <ShieldAlert className="w-16 h-16 text-red-500" />
                </div>
                <h1 className="text-3xl font-mono text-white font-bold tracking-widest text-shadow-red shadow-black drop-shadow-lg">
                    ACCESS DENIED
                </h1>
                <p className="text-red-200 font-mono">
                    Your account has been suspended due to a violation of our terms of service.
                </p>
                <div className="pt-4 border-t border-red-900/50">
                    <p className="text-gray-500 text-sm mb-4">
                        If you believe this is a mistake, please contact support.
                    </p>
                    <Link
                        href="/"
                        className="text-red-400 hover:text-red-300 font-mono text-sm underline decoration-red-800 underline-offset-4"
                    >
                        Return to Home
                    </Link>
                </div>
            </div>
        </main>
    );
}
