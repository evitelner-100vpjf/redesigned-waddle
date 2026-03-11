import { useHello } from "@/hooks/use-hello";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data, isLoading, error, refetch } = useHello();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="flex flex-col items-center gap-4 text-muted-foreground"
          >
            <Loader2 className="w-5 h-5 animate-spin" strokeWidth={1.5} />
            <p className="text-sm font-medium tracking-widest uppercase opacity-60">Awakening</p>
          </motion.div>
        ) : error ? (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center max-w-md text-center space-y-6"
          >
            <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center text-destructive mb-2">
              <span className="font-serif italic text-xl">!</span>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl text-foreground">Connection Lost</h2>
              <p className="text-muted-foreground leading-relaxed">
                We couldn't reach the server. Please check your connection and try again.
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => refetch()}
              className="group rounded-full px-6 hover-elevate transition-all"
            >
              <RefreshCcw className="w-4 h-4 mr-2 group-hover:-rotate-180 transition-transform duration-500 ease-out" />
              Retry Connection
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Subtle decorative elements for minimal depth */}
            <div className="absolute -inset-x-12 -inset-y-12 bg-gradient-to-b from-primary/5 to-transparent blur-2xl rounded-full opacity-50 pointer-events-none" />
            
            <div className="relative text-center space-y-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 1 }}
                className="inline-block"
              >
                <span className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                  Server Response
                </span>
              </motion.div>
              
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-foreground tracking-tight py-2 px-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70">
                  {data?.message || "Hello"}
                </span>
                <span className="font-serif italic text-muted-foreground/40 pr-2">.</span>
              </h1>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
