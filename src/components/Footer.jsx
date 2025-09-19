import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {currentYear} My Store. All Rights Reserved.
          </p>

          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <a 
              href="#" 
              aria-label="Facebook page" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Facebook className="size-5" />
            </a>
            <a 
              href="#" 
              aria-label="Twitter page" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Twitter className="size-5" />
            </a>
            <a 
              href="#" 
              aria-label="Instagram page" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Instagram className="size-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}