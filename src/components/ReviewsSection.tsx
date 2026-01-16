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
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const defaultReviews: Review[] = [];

const ReviewsSection = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadReviews = async () => {
      const { data, error } = await fetchReviews();

      if (error) {
        console.error("Failed to fetch reviews:", error);
        toast.error(`Failed to fetch reviews: ${error}`);
        setReviews(defaultReviews);
      } else if (data && data.length > 0) {
        console.log("Fetched reviews:", data);
        // Sort reviews by date descending (latest first)
        const sorted = [...data].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setReviews(sorted);
      } else {
        console.log("No data returned from Supabase");
        setReviews(defaultReviews);
      }
    };
    loadReviews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !comment.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    const newReview = {
      name: name.trim(),
      rating,
      comment: comment.trim(),
      date: new Date().toISOString().split("T")[0],
    };

    const result = await postReview(newReview);

    if (!result.success) {
      toast.error(`Failed to submit review: ${result.error}`);
      return;
    }

    // Add new review and sort by date descending
    const updated = [newReview as any, ...reviews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setReviews(updated);
    setName("");
    setRating(null);
    setComment("");
    setIsOpen(false);
    toast.success("Thank you for your review!");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // First 3 reviews for vertical display
  const featuredReviews = reviews.slice(0, 3);
  // Remaining reviews for horizontal scroll
  const scrollableReviews = reviews.slice(3);

  const ReviewCard = ({ review, index }: { review: Review; index: number }) => (
    <Card
      className="bg-card border-border/50 hover:shadow-card transition-shadow duration-300 flex-shrink-0 w-full md:w-auto"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <CardContent className="p-4 space-y-3">
        <Quote className="w-8 h-8 text-primary/20" />

        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-4 h-4 ${star <= review.rating
                ? "fill-accent text-accent"
                : "text-border"
                }`}
            />
          ))}
        </div>

        <p className="text-foreground text-sm leading-relaxed line-clamp-3">{review.comment}</p>

        <div className="pt-3 border-t border-border">
          <p className="font-semibold text-foreground text-sm">{review.name}</p>
          <p className="text-xs text-muted-foreground">{formatDate(review.date)}</p>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <section id="reviews" className="py-12 md:py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4 mb-8">
          <div className="space-y-2">
            <span className="text-primary font-semibold text-xs uppercase tracking-wider">
              Testimonials
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              Patients Testimonials
            </h2>
            <p className="text-muted-foreground text-sm max-w-xl">
              Read genuine reviews from our patients and share your experience.
            </p>
          </div>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1.5 w-fit">
                <Plus className="w-4 h-4" />
                Write a Review
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md mx-4">
              <DialogHeader>
                <DialogTitle className="font-display text-xl">Share Your Experience</DialogTitle>
                <DialogDescription className="text-sm">
                  Your feedback helps us improve and helps others make informed decisions.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-3">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-sm">Your Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="bg-background"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm">Rating</Label>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="focus:outline-none transition-transform hover:scale-110"
                        title={`Rate ${star} stars`}
                      >
                        <Star
                          className={`w-7 h-7 ${star <= rating
                            ? "fill-accent text-accent"
                            : "text-border"
                            }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="comment" className="text-sm">Your Review</Label>
                  <Textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell us about your experience..."
                    className="min-h-[100px] bg-background resize-none"
                  />
                </div>

                <Button type="submit" className="w-full">
                  Submit Review
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Featured Reviews - Vertical Stack (First 3) */}
        <div className="flex flex-col gap-4 mb-6">
          {featuredReviews.map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} />
          ))}
        </div>

        {/* Scrollable Reviews */}
        {scrollableReviews.length > 0 && (
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-muted-foreground">More Reviews</p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => scroll("left")}
                  title="Scroll left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => scroll("right")}
                  title="Scroll right"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
            >
              {scrollableReviews.map((review, index) => (
                <div key={review.id} className="snap-start min-w-[280px] max-w-[300px]">
                  <ReviewCard review={review} index={index + 3} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewsSection;