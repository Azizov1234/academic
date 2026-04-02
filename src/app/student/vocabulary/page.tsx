"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2,
  XCircle,
  ChevronRight,
  ChevronLeft,
  Volume2,
  RotateCcw,
  Flame,
  Star,
  Brain,
} from "lucide-react";
import { mockVocabulary } from "@/lib/mock-data";
import { VocabWord } from "@/lib/types";
import { getLevelBgColor } from "@/lib/utils-helpers";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function StudentVocabularyPage() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [mastered, setMastered] = useState<string[]>(
    mockVocabulary.filter(w => w.mastered).map(w => w.id)
  );
  const [mode, setMode] = useState<"flashcard" | "list">("flashcard");

  const words = mockVocabulary;
  const current = words[currentIdx];
  const masteredCount = mastered.length;
  const progress = Math.round((masteredCount / words.length) * 100);

  function next() {
    setFlipped(false);
    setTimeout(() => setCurrentIdx(i => Math.min(i + 1, words.length - 1)), 150);
  }

  function prev() {
    setFlipped(false);
    setTimeout(() => setCurrentIdx(i => Math.max(i - 1, 0)), 150);
  }

  function markMastered(id: string) {
    if (!mastered.includes(id)) {
      setMastered(prev => [...prev, id]);
      toast.success("So'z o'zlashtirildi! 🎉");
    }
    next();
  }

  function markNotMastered(id: string) {
    setMastered(prev => prev.filter(m => m !== id));
    next();
  }

  return (
    <DashboardLayout title="Lug'at Mashqi">
      <div className="space-y-5 max-w-2xl mx-auto">
        {/* Header Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card>
            <CardContent className="pt-3 pb-3 text-center">
              <div className="text-2xl font-bold text-primary">{masteredCount}</div>
              <div className="text-xs text-muted-foreground">O'zlashtirildi</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-3 pb-3 text-center">
              <div className="text-2xl font-bold">{words.length - masteredCount}</div>
              <div className="text-xs text-muted-foreground">Qolgan</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-3 pb-3 text-center">
              <div className="text-2xl font-bold text-amber-500">{progress}%</div>
              <div className="text-xs text-muted-foreground">Progress</div>
            </CardContent>
          </Card>
        </div>

        <Progress value={progress} className="h-2" />

        {/* Mode Toggle */}
        <div className="flex gap-2">
          <Button
            variant={mode === "flashcard" ? "default" : "outline"}
            size="sm"
            onClick={() => setMode("flashcard")}
            className="gap-2"
          >
            <Brain className="h-3.5 w-3.5" />
            Flashcard
          </Button>
          <Button
            variant={mode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setMode("list")}
          >
            Ro'yxat
          </Button>
        </div>

        {mode === "flashcard" && current && (
          <div className="space-y-5">
            {/* Counter */}
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>{currentIdx + 1} / {words.length}</span>
              <Badge className={cn("text-[10px]", getLevelBgColor(current.level))}>{current.level}</Badge>
            </div>

            {/* Flashcard */}
            <div
              className={cn(
                "relative min-h-[280px] rounded-2xl cursor-pointer transition-all duration-300",
                "border-2 shadow-lg",
                flipped ? "border-primary/40" : "border-border"
              )}
              onClick={() => setFlipped(!flipped)}
            >
              {!flipped ? (
                /* Front */
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center space-y-4">
                  <div className="text-4xl font-bold">{current.word}</div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 text-muted-foreground"
                    onClick={e => { e.stopPropagation(); toast.info("Audio ijro etilmoqda..."); }}
                  >
                    <Volume2 className="h-4 w-4" />
                    Talaffuz
                  </Button>
                  <div className="text-sm text-muted-foreground mt-2">
                    Tap qilib ma'nosini ko'ring
                  </div>
                </div>
              ) : (
                /* Back */
                <div className="absolute inset-0 flex flex-col justify-center p-8 space-y-4 bg-primary/5 rounded-2xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-1">{current.word}</div>
                    <div className="text-xl text-primary font-semibold">{current.translation}</div>
                  </div>
                  <div className="space-y-2.5 text-sm">
                    <div>
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Ta'rif</span>
                      <p className="text-foreground">{current.definition}</p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Misol</span>
                      <p className="text-muted-foreground italic">"{current.example}"</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={prev}
                disabled={currentIdx === 0}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              {flipped && (
                <>
                  <Button
                    className="flex-1 gap-2 bg-red-500 hover:bg-red-600 text-white"
                    onClick={() => markNotMastered(current.id)}
                  >
                    <XCircle className="h-5 w-5" />
                    Bilmadim
                  </Button>
                  <Button
                    className="flex-1 gap-2 bg-green-500 hover:bg-green-600 text-white"
                    onClick={() => markMastered(current.id)}
                  >
                    <CheckCircle2 className="h-5 w-5" />
                    Bildim!
                  </Button>
                </>
              )}

              {!flipped && (
                <Button
                  className="flex-1 gap-2"
                  variant="outline"
                  onClick={next}
                  disabled={currentIdx === words.length - 1}
                >
                  Keyingisi
                  <ChevronRight className="h-5 w-5" />
                </Button>
              )}

              <Button
                variant="outline"
                size="icon"
                onClick={next}
                disabled={currentIdx === words.length - 1}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            {mastered.includes(current.id) && (
              <div className="flex items-center gap-2 justify-center text-sm text-green-600">
                <Star className="h-4 w-4 fill-current" />
                Bu so'z o'zlashtirilgan
              </div>
            )}

            <Button
              variant="ghost"
              size="sm"
              className="w-full gap-2 text-muted-foreground"
              onClick={() => { setCurrentIdx(0); setFlipped(false); toast.info("Boshidan boshlandi"); }}
            >
              <RotateCcw className="h-4 w-4" />
              Boshidan boshlash
            </Button>
          </div>
        )}

        {mode === "list" && (
          <div className="space-y-2">
            {words.map(word => (
              <Card key={word.id} className={cn(
                "transition-colors",
                mastered.includes(word.id) && "border-green-200 dark:border-green-900/30 bg-green-50/50 dark:bg-green-900/10"
              )}>
                <CardContent className="pt-3 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">{word.word}</span>
                        <Badge className={cn("text-[10px]", getLevelBgColor(word.level))}>{word.level}</Badge>
                        {mastered.includes(word.id) && (
                          <Star className="h-3.5 w-3.5 text-amber-500 fill-current" />
                        )}
                      </div>
                      <div className="text-xs text-primary font-medium">{word.translation}</div>
                      <div className="text-xs text-muted-foreground line-clamp-1">{word.definition}</div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className={cn(
                        "h-8 text-xs",
                        mastered.includes(word.id) ? "text-green-600" : "text-muted-foreground"
                      )}
                      onClick={() => mastered.includes(word.id) ? markNotMastered(word.id) : markMastered(word.id)}
                    >
                      {mastered.includes(word.id) ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
