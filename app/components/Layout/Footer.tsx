export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/40 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              Built with modern web technologies.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-xs text-muted-foreground">
              © 2025 Your Company Name
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
