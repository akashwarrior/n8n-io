'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle, X } from 'lucide-react';

export function KeyboardShortcutsHelp() {
  const [isOpen, setIsOpen] = useState(false);

  const shortcuts = [
    { keys: ['Delete', 'Backspace'], description: 'Delete selected node or edge' },
    { keys: ['Escape'], description: 'Close configuration panel' },
    { keys: ['Ctrl/Cmd', 'B'], description: 'Toggle nodes sidebar' },
    { keys: ['Double Click'], description: 'Configure node' },
    { keys: ['Ctrl/Cmd', 'Click'], description: 'Multi-select nodes' },
  ];

  if (!isOpen) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-white shadow-sm border border-neutral-200 hover:bg-neutral-50 text-neutral-600"
      >
        <HelpCircle className="w-4 h-4 mr-2" />
        Shortcuts
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-80 shadow-lg border border-neutral-200 bg-white">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-neutral-900">Keyboard Shortcuts</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="p-1 h-6 w-6 text-neutral-400 hover:text-neutral-600"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {shortcuts.map((shortcut, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm text-neutral-600">{shortcut.description}</span>
            <div className="flex items-center gap-1">
              {shortcut.keys.map((key, keyIndex) => (
                <span key={keyIndex} className="flex items-center">
                  <kbd className="px-2 py-1 text-xs font-mono bg-neutral-100 border border-neutral-200 rounded text-neutral-700">
                    {key}
                  </kbd>
                  {keyIndex < shortcut.keys.length - 1 && (
                    <span className="mx-1 text-neutral-400">+</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
