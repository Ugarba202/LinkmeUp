import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scan QR Code — LinkMeUp",
  description: "Scan any LinkMeUp QR code to instantly view someone's social links.",
};

export default function ScanPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center px-6 max-w-md mx-auto">
        <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 mx-auto mb-6 flex items-center justify-center">
          <svg
            className="w-10 h-10 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-2">QR Scanner</h1>
        <p className="text-muted-foreground text-sm mb-8">
          Camera-based QR scanning — coming in Phase 5
        </p>
        <a
          href="/"
          className="text-sm text-primary hover:text-primary-light transition-colors"
        >
          ← Back to LinkMeUp
        </a>
      </div>
    </div>
  );
}
