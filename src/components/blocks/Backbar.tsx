//src\components\blocks\Backbar.tsx
import { ChevronLeftSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Backbar() {

  return (
    <div
      className={cn(
        'fixed top-0 left-0 right-0 z-50 border-b border-line-1 h-16'
      )}
    >
      <div className="container mx-auto h-full px-6">
        <div className="flex h-full items-center justify-between">
          <div className="flex items-center gap-4">

            {/* Back Link */}
            <div className="flex items-center">
              <ChevronLeftSquare className="h-8 w-8" />
            </div>

            {/* Title */}
            <div className="flex items-center">
              <h1 className="font-bold">Back</h1>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}