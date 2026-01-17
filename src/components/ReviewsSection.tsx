import { useState, useEffect, useRef } from "react";
import { Star, Quote, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { postReview, fetchReviews } from "@/api/reviewsApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface Review {
  id?: string;
  name: string;
  rating: number | null;
  comment: string;
  date: string;
}

const ReviewsSection = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const [name, setName] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");

  // Google review flow
  const [showGooglePrompt, setShowGooglePrompt] = useState(false);
  const [lastReviewText, setLastReviewText] = useState("");

  const scrollRef = useRef<HTMLDivElement>(null);

  /* ---------------- FETCH REVIEWS ---------------- */
  useEffect(() => {
    const loadReviews = async () => {
      const { data, error } = await fetchReviews();

      if (error) {
        toast.error("Failed to fetch reviews");
        return;
      }

      if (data) {
        const sorted = [...data].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setReviews(sorted);
      }
    };
    loadReviews();
  }, []);

  /* ---------------- SUBMIT REVIEW ---------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !comment.trim() || !rating) {
      toast.error("Please fill all fields");
      return;
    }

    const newReview: Review = {
      name: name.trim(),
      rating,
      comment: comment.trim(),
      date: new Date().toISOString().split("T")[0],
    };

    const result = await postReview(newReview);

    if (!result.success) {
      toast.error("Failed to submit review");
      return;
    }

    setReviews((prev) => [newReview, ...prev]);

    // save for google
    setLastReviewText(comment.trim());

    // reset
    setName("");
    setRating(null);
    setComment("");
    setIsOpen(false);

    toast.success("Thank you for your review!");

    // show google prompt only for good ratings
    if (rating >= 4) {
      setShowGooglePrompt(true);
    }
  };

  /* ---------------- GOOGLE REVIEW HANDLER ---------------- */
  const handleGoogleReview = async () => {
    try {
      await navigator.clipboard.writeText(lastReviewText);

      window.open(
        "https://g.page/r/CeuovpAx9kNzEBM/review",
        "_blank"
      );

      toast.success("Review copied! Paste it on Google (Ctrl + V)");
      setShowGooglePrompt(false);
    } catch {
      toast.error("Clipboard permission denied");
    }
  };

  /* ---------------- HELPERS ---------------- */
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  const featuredReviews = reviews.slice(0, 3);
  const scrollableReviews = reviews.slice(3);

  const ReviewCard = ({ review }: { review: Review }) => (
    <Card className="bg-card border-border/50 flex-shrink-0">
      <CardContent className="p-4 space-y-3">
        <Quote className="w-8 h-8 text-primary/20" />
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              className={`w-4 h-4 ${
                s <= (review.rating ?? 0)
                  ? "fill-accent text-accent"
                  : "text-border"
              }`}
            />
          ))}
        </div>
        <p className="text-sm line-clamp-3">{review.comment}</p>
        <div className="border-t pt-2">
          <p className="font-semibold text-sm">{review.name}</p>
          <p className="text-xs text-muted-foreground">
            {formatDate(review.date)}
          </p>
        </div>
      </CardContent>
    </Card>
  );

  /* ---------------- UI ---------------- */
  return (
    <section id="reviews" className="py-12 bg-muted/50">
      <div className="container mx-auto px-4 space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Patient Testimonials</h2>
            <p className="text-sm text-muted-foreground">
              Share your experience with us
            </p>
          </div>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-1" /> Write Review
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Share Your Experience</DialogTitle>
                <DialogDescription>
                  Your feedback helps others.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Your Name</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div>
                  <Label>Rating</Label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setRating(s)}
                      >
                        <Star
                          className={`w-7 h-7 ${
                            s <= (rating ?? 0)
                              ? "fill-accent text-accent"
                              : "text-border"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Review</Label>
                  <Textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Submit Review
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* REVIEWS */}
        <div className="space-y-4">
          {featuredReviews.map((r, i) => (
            <ReviewCard key={i} review={r} />
          ))}
        </div>

        {scrollableReviews.length > 0 && (
          <div>
            <div className="flex justify-end gap-2 mb-2">
              <Button size="icon" variant="outline" onClick={() => scroll("left")}>
                <ChevronLeft />
              </Button>
              <Button size="icon" variant="outline" onClick={() => scroll("right")}>
                <ChevronRight />
              </Button>
            </div>

            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto pb-2"
            >
              {scrollableReviews.map((r, i) => (
                <div key={i} className="min-w-[280px]">
                  <ReviewCard review={r} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GOOGLE REVIEW POPUP */}
        <Dialog open={showGooglePrompt} onOpenChange={setShowGooglePrompt}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Support us on Google ⭐</DialogTitle>
              <DialogDescription>
                Your review is copied. Paste it on Google.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3">
              <div className="border p-3 rounded bg-muted text-sm">
                {lastReviewText}
              </div>

              <Button onClick={handleGoogleReview} className="w-full">
                Copy & Post on Google
              </Button>

              <Button
                variant="ghost"
                className="w-full"
                onClick={() => setShowGooglePrompt(false)}
              >
                Skip for now
              </Button>
            </div>
          </DialogContent>
        </Dialog>

      </div>
    </section>
  );
};

export default ReviewsSection;
