import { useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Download, ExternalLink, Printer, FileText } from "lucide-react";
import { toast } from "sonner";

interface ResumeModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const ResumeModal = ({ isOpen, onOpenChange }: ResumeModalProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleDownload = () => {
    toast.success("Download started!", {
      description: "Resume.pdf has been downloaded to your device.",
    });
  };

  const handlePrint = () => {
    if (iframeRef.current) {
      try {
        iframeRef.current.contentWindow?.focus();
        iframeRef.current.contentWindow?.print();
        toast.info("Opening system print dialog...");
      } catch (err) {
        toast.error("Failed to print directly. Please use the download option.");
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-[95vw] h-[90vh] md:h-[85vh] flex flex-col gap-4 border bg-background/95 backdrop-blur-xl p-6 shadow-2xl rounded-2xl glow-effect-sm">
        <DialogHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-2 border-b border-border/50">
          <div className="space-y-1">
            <DialogTitle className="text-xl md:text-2xl font-bold flex items-center gap-2">
              <FileText className="text-primary w-5 h-5 animate-pulse" />
              <span>Gowri Praveen K</span>
              <span className="text-sm font-normal text-muted-foreground hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-secondary/80 border border-border">
                Resume.pdf
              </span>
            </DialogTitle>
            <DialogDescription className="text-xs md:text-sm text-muted-foreground font-medium">
              Junior MERN Stack Developer | Full-Stack Web Developer
            </DialogDescription>
          </div>

          {/* Action Header controls */}
          <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
            <button
              onClick={handlePrint}
              className="hidden md:flex items-center justify-center p-2 rounded-lg bg-secondary/40 hover:bg-secondary border border-border/60 text-muted-foreground hover:text-foreground transition-all duration-200"
              title="Print Resume"
            >
              <Printer size={18} />
            </button>
            <a
              href="/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-2 rounded-lg bg-secondary/40 hover:bg-secondary border border-border/60 text-muted-foreground hover:text-foreground transition-all duration-200"
              title="Open in New Tab"
            >
              <ExternalLink size={18} />
            </a>
            <a
              href="/Resume.pdf"
              download="Resume.pdf"
              onClick={handleDownload}
              className="btn-primary py-2 px-4 text-xs md:text-sm flex items-center gap-2 hover:scale-105 shadow-md shadow-primary/10 transition-all duration-200"
              title="Download PDF"
            >
              <Download size={16} />
              <span>Download</span>
            </a>
          </div>
        </DialogHeader>

        {/* PDF Viewer Area */}
        <div className="flex-1 min-h-0 relative">
          {/* Desktop PDF Reader */}
          <div className="hidden md:block w-full h-full rounded-xl overflow-hidden border border-border/50 bg-secondary/10">
            <iframe
              ref={iframeRef}
              src="/Resume.pdf#toolbar=0"
              title="Gowri Praveen K - Resume Viewer"
              className="w-full h-full border-none"
            />
          </div>

          {/* Responsive Mobile Callout (Safari/Safari/Mobile don't render inline PDFs) */}
          <div className="md:hidden flex flex-col items-center justify-center h-full p-6 rounded-xl border border-dashed border-border/80 bg-secondary/10 text-center gap-6">
            <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary glow-effect-sm border border-primary/20">
              <FileText size={40} />
            </div>
            <div className="max-w-xs">
              <h4 className="font-bold text-foreground text-lg mb-1">Resume Ready</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Mobile browsers generally do not support inline PDF viewers. Tap below to download or view full-screen instantly.
              </p>
            </div>
            <div className="flex flex-col w-full gap-2">
              <a
                href="/Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full text-center py-3 flex items-center justify-center gap-2"
              >
                <ExternalLink size={16} />
                View Fullscreen
              </a>
              <a
                href="/Resume.pdf"
                download="Resume.pdf"
                onClick={handleDownload}
                className="btn-outline w-full text-center py-3 flex items-center justify-center gap-2 hover:bg-secondary"
              >
                <Download size={16} />
                Download PDF
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeModal;
