"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Mic2, Calendar, CheckCircle2, Clock } from "lucide-react";

export default function TalksPage() {
  const [activeTab, setActiveTab] = useState<
    "community" | "speaker" | "events"
  >("community");

  const [speakerFormData, setSpeakerFormData] = useState({
    name: "",
    email: "",
    talkTitle: "",
    description: "",
    format: "",
  });
  const [speakerFormErrors, setSpeakerFormErrors] = useState<
    Record<string, string>
  >({});
  const [speakerFormSuccess, setSpeakerFormSuccess] = useState(false);

  const [eventFormData, setEventFormData] = useState({
    name: "",
    email: "",
    eventTypes: [] as string[],
    suggestion: "",
  });
  const [eventFormErrors, setEventFormErrors] = useState<
    Record<string, string>
  >({});
  const [eventFormSuccess, setEventFormSuccess] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      const eventDate = new Date(`${currentYear}-12-05T00:00:00`);

      // If Dec 5 has passed this year, target next year
      if (eventDate < now) {
        eventDate.setFullYear(currentYear + 1);
      }

      const diff = eventDate.getTime() - now.getTime();

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds });
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const upcomingTalks = [
    {
      date: "Dec 5",
      title: "Building Your First Automation",
      speaker: "TBA",
      description:
        "Learn how to create simple automations that save hours of work. Perfect for beginners.",
      color: "neon-primary",
    },
    {
      date: "Dec 19",
      title: "From Idea to MVP in 30 Days",
      speaker: "TBA",
      description:
        "A practical guide to rapid prototyping and validation using no-code tools.",
      color: "neon-accent",
    },
    {
      date: "Jan 9",
      title: "Community Showcase",
      speaker: "TBA",
      description:
        "Members share their projects, wins, and lessons learned. Open mic style.",
      color: "neon-secondary",
    },
  ];

  const eventTypeOptions = [
    "Bootcamps",
    "Live Coding",
    "Career Panels",
    "Product Deep Dives",
    "Founder Stories",
    "Workshops",
    "Networking Events",
  ];

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const formatSpeakerTweet = () => {
    const formatLabels: Record<string, string> = {
      workshop: "Workshop",
      lightning: "Lightning Talk",
      panel: "Panel Discussion",
      presentation: "Presentation",
    };

    const tweetText = `🎤 Speaker Request for Kracked Community Talks

Name: ${speakerFormData.name}
Email: ${speakerFormData.email}

Talk Title: ${speakerFormData.talkTitle}
Format: ${formatLabels[speakerFormData.format] || speakerFormData.format}

Description:
${speakerFormData.description}

@solahidris_ @masterofnone #KrackedTalks #CommunitySpeaker`;

    return encodeURIComponent(tweetText);
  };

  const formatEventFeedbackTweet = () => {
    let tweetText = `💡 Event Feedback for Kracked Community\n\n`;

    if (eventFormData.name) {
      tweetText += `Name: ${eventFormData.name}\n`;
    }
    if (eventFormData.email) {
      tweetText += `Email: ${eventFormData.email}\n`;
    }

    if (eventFormData.eventTypes.length > 0) {
      tweetText += `\nInterested in: ${eventFormData.eventTypes.join(", ")}\n`;
    }

    if (eventFormData.suggestion.trim()) {
      tweetText += `\nSuggestion:\n${eventFormData.suggestion}\n`;
    }

    tweetText += `\n@solahidris_ @masterofnone #KrackedTalks #CommunityFeedback`;

    return encodeURIComponent(tweetText);
  };

  const handleSpeakerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!speakerFormData.name.trim()) {
      errors.name = "Name is required";
    }
    if (!speakerFormData.email.trim()) {
      errors.email = "Email is required";
    } else if (!validateEmail(speakerFormData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!speakerFormData.talkTitle.trim()) {
      errors.talkTitle = "Talk title is required";
    }
    if (!speakerFormData.description.trim()) {
      errors.description = "Description is required";
    }
    if (!speakerFormData.format) {
      errors.format = "Please select a format";
    }

    if (Object.keys(errors).length > 0) {
      setSpeakerFormErrors(errors);
      return;
    }

    setSpeakerFormErrors({});
    setSpeakerFormSuccess(true);

    const tweetText = formatSpeakerTweet();
    const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;

    setSpeakerFormData({
      name: "",
      email: "",
      talkTitle: "",
      description: "",
      format: "",
    });

    setTimeout(() => {
      setSpeakerFormSuccess(false);
      window.open(tweetUrl, "_blank", "noopener,noreferrer");
    }, 1000);
  };

  const handleEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (eventFormData.email && !validateEmail(eventFormData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (
      eventFormData.eventTypes.length === 0 &&
      !eventFormData.suggestion.trim()
    ) {
      errors.general =
        "Please select at least one event type or provide a suggestion";
    }

    if (Object.keys(errors).length > 0) {
      setEventFormErrors(errors);
      return;
    }

    setEventFormErrors({});
    setEventFormSuccess(true);

    const tweetText = formatEventFeedbackTweet();
    const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;

    setEventFormData({
      name: "",
      email: "",
      eventTypes: [],
      suggestion: "",
    });

    setTimeout(() => {
      setEventFormSuccess(false);
      window.open(tweetUrl, "_blank", "noopener,noreferrer");
    }, 1000);
  };

  const toggleEventType = (type: string) => {
    setEventFormData((prev) => ({
      ...prev,
      eventTypes: prev.eventTypes.includes(type)
        ? prev.eventTypes.filter((t) => t !== type)
        : [...prev.eventTypes, type],
    }));
  };

  return (
    <main className="min-h-screen pb-20 overflow-hidden">
      <PageHero
        title="Kracked Talks"
        subtitle="Hear from key figures in the industry."
      >
        <Button
          size="lg"
          variant="cyberpunk"
          asChild
          className="h-14 px-8 text-lg"
        >
          <Link
            href="https://x.com/i/communities/1983062242292822298"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sign Up for Community Talks
          </Link>
        </Button>
      </PageHero>

      {/* Tabs Navigation */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex justify-center overflow-x-auto">
            <div className="flex gap-2 min-w-max">
              <button
                onClick={() => setActiveTab("community")}
                className={`px-4 md:px-6 py-3 font-mono text-xs md:text-sm uppercase tracking-wider transition-all relative whitespace-nowrap ${
                  activeTab === "community"
                    ? "text-neon-primary border-b-2 border-neon-primary"
                    : "text-muted-foreground hover:text-zinc-50"
                }`}
              >
                Community Talks
              </button>
              <button
                onClick={() => setActiveTab("speaker")}
                className={`px-4 md:px-6 py-3 font-mono text-xs md:text-sm uppercase tracking-wider transition-all relative whitespace-nowrap ${
                  activeTab === "speaker"
                    ? "text-neon-primary border-b-2 border-neon-primary"
                    : "text-muted-foreground hover:text-zinc-50"
                }`}
              >
                Request Speaker
              </button>
              <button
                onClick={() => setActiveTab("events")}
                className={`px-4 md:px-6 py-3 font-mono text-xs md:text-sm uppercase tracking-wider transition-all relative whitespace-nowrap ${
                  activeTab === "events"
                    ? "text-neon-primary border-b-2 border-neon-primary"
                    : "text-muted-foreground hover:text-zinc-50"
                }`}
              >
                Event Feedback
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Community Talks Tab */}
      {activeTab === "community" && (
        <div className="min-h-screen flex items-center justify-center relative z-10">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 w-full py-12">
            <div className="space-y-20 md:space-y-24">
              {/* Upcoming Community Talks Section */}
              <section>
                <h2 className="text-3xl font-bold mb-16 md:mb-20 text-center font-mono uppercase tracking-widest text-zinc-50/80 flex items-center justify-center gap-3">
                  <Calendar className="w-6 h-6 text-neon-primary" />
                  Upcoming Community Talks
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                  {upcomingTalks.map((talk, index) => {
                    const isDec5Event = talk.date === "Dec 5";

                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <Card
                          className={`h-full group transition-all duration-300 ${
                            isDec5Event
                              ? "border-2 border-green-700 brightness-150 bg-black/90 hover:border-green-700 shadow-[0_0_50px_rgba(21,128,61,0.6)] hover:shadow-[0_0_70px_rgba(21,128,61,0.8)] relative flex flex-col"
                              : "border-white/5 hover:border-white/20 hover:bg-white/5"
                          }`}
                        >
                          <CardHeader>
                            <div className="flex items-center justify-between mb-2">
                              <Badge
                                variant="outline"
                                className={
                                  talk.color === "neon-accent"
                                    ? "border-neon-accent text-neon-accent shadow-[0_0_10px_rgba(240,240,240,0.2)]"
                                    : talk.color === "neon-primary"
                                    ? "border-green-700 text-green-700 shadow-[0_0_10px_rgba(21,128,61,0.2)]"
                                    : "border-green-700 text-green-700 shadow-[0_0_10px_rgba(21,128,61,0.2)]"
                                }
                              >
                                {talk.date}
                              </Badge>
                            </div>
                            <CardTitle
                              className={`text-xl mb-2 ${
                                isDec5Event
                                  ? "text-green-700 drop-shadow-[0_0_8px_rgba(21,128,61,0.8)]"
                                  : ""
                              }`}
                            >
                              {talk.title}
                            </CardTitle>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Mic2 className="w-4 h-4" />
                              <span>{talk.speaker}</span>
                            </div>
                          </CardHeader>
                          <CardContent className={isDec5Event ? "flex-1" : ""}>
                            <p
                              className={`mb-4 transition-colors ${
                                isDec5Event
                                  ? "text-zinc-50 font-semibold group-hover:text-green-700 drop-shadow-[0_0_4px_rgba(21,128,61,0.5)]"
                                  : "text-muted-foreground group-hover:text-zinc-50/90"
                              }`}
                            >
                              {talk.description}
                            </p>
                            {isDec5Event && (
                              <div className="mt-4 pt-4 border-t border-neon-primary/30">
                                <div className="flex items-center gap-2 mb-3">
                                  <Clock className="w-4 h-4 text-neon-primary" />
                                  <span className="text-sm font-semibold text-neon-primary uppercase tracking-wider">
                                    Countdown
                                  </span>
                                </div>
                                <div className="grid grid-cols-4 gap-2">
                                  <div className="text-center p-2 bg-black/40 rounded border border-neon-primary/30">
                                    <div className="text-lg font-bold text-neon-primary font-mono">
                                      {countdown.days}
                                    </div>
                                    <div className="text-xs text-muted-foreground uppercase">
                                      Days
                                    </div>
                                  </div>
                                  <div className="text-center p-2 bg-black/40 rounded border border-neon-primary/30">
                                    <div className="text-lg font-bold text-neon-primary font-mono">
                                      {countdown.hours}
                                    </div>
                                    <div className="text-xs text-muted-foreground uppercase">
                                      Hours
                                    </div>
                                  </div>
                                  <div className="text-center p-2 bg-black/40 rounded border border-neon-primary/30">
                                    <div className="text-lg font-bold text-neon-primary font-mono">
                                      {countdown.minutes}
                                    </div>
                                    <div className="text-xs text-muted-foreground uppercase">
                                      Mins
                                    </div>
                                  </div>
                                  <div className="text-center p-2 bg-black/40 rounded border border-neon-primary/30">
                                    <div className="text-lg font-bold text-neon-primary font-mono">
                                      {countdown.seconds}
                                    </div>
                                    <div className="text-xs text-muted-foreground uppercase">
                                      Secs
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </section>
            </div>
          </div>
        </div>
      )}

      {/* Request to be a Speaker Tab */}
      {activeTab === "speaker" && (
        <div className="min-h-screen flex items-center justify-center relative z-10">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 w-full py-12">
            <Card className="border-white/10 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-md overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,143,17,0.15)_0%,transparent_70%)] pointer-events-none" />
              <CardContent className="pt-16 pb-16 md:pt-20 md:pb-20 relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
                  Request to be a Speaker
                </h2>
                <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Have expertise to share? We'd love to hear from you. Submit
                  your talk proposal below.
                </p>

                {speakerFormSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-neon-primary/20 border border-neon-primary/50 rounded-lg flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-neon-primary" />
                    <span className="text-neon-primary">
                      Request received! We'll get back to you soon.
                    </span>
                  </motion.div>
                )}

                <form
                  onSubmit={handleSpeakerSubmit}
                  className="max-w-2xl mx-auto space-y-6"
                >
                  <div>
                    <label
                      htmlFor="speaker-name"
                      className="block text-sm font-medium mb-2"
                    >
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="speaker-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={speakerFormData.name}
                      onChange={(e) =>
                        setSpeakerFormData({
                          ...speakerFormData,
                          name: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-zinc-50 focus:outline-none focus:border-neon-primary focus:ring-1 focus:ring-neon-primary"
                    />
                    {speakerFormErrors.name && (
                      <p className="mt-1 text-sm text-red-500">
                        {speakerFormErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="speaker-email"
                      className="block text-sm font-medium mb-2"
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="speaker-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={speakerFormData.email}
                      onChange={(e) =>
                        setSpeakerFormData({
                          ...speakerFormData,
                          email: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-zinc-50 focus:outline-none focus:border-neon-primary focus:ring-1 focus:ring-neon-primary"
                    />
                    {speakerFormErrors.email && (
                      <p className="mt-1 text-sm text-red-500">
                        {speakerFormErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="talk-title"
                      className="block text-sm font-medium mb-2"
                    >
                      Proposed Talk Title{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="talk-title"
                      name="talkTitle"
                      type="text"
                      value={speakerFormData.talkTitle}
                      onChange={(e) =>
                        setSpeakerFormData({
                          ...speakerFormData,
                          talkTitle: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-zinc-50 focus:outline-none focus:border-neon-primary focus:ring-1 focus:ring-neon-primary"
                    />
                    {speakerFormErrors.talkTitle && (
                      <p className="mt-1 text-sm text-red-500">
                        {speakerFormErrors.talkTitle}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="talk-description"
                      className="block text-sm font-medium mb-2"
                    >
                      Short Description/Outline{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="talk-description"
                      name="description"
                      rows={4}
                      value={speakerFormData.description}
                      onChange={(e) =>
                        setSpeakerFormData({
                          ...speakerFormData,
                          description: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-zinc-50 focus:outline-none focus:border-neon-primary focus:ring-1 focus:ring-neon-primary resize-none"
                    />
                    {speakerFormErrors.description && (
                      <p className="mt-1 text-sm text-red-500">
                        {speakerFormErrors.description}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="talk-format"
                      className="block text-sm font-medium mb-2"
                    >
                      Preferred Format <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="talk-format"
                      name="format"
                      value={speakerFormData.format}
                      onChange={(e) =>
                        setSpeakerFormData({
                          ...speakerFormData,
                          format: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-zinc-50 focus:outline-none focus:border-neon-primary focus:ring-1 focus:ring-neon-primary"
                    >
                      <option value="">Select a format</option>
                      <option value="workshop">Workshop</option>
                      <option value="lightning">Lightning Talk</option>
                      <option value="panel">Panel Discussion</option>
                      <option value="presentation">Presentation</option>
                    </select>
                    {speakerFormErrors.format && (
                      <p className="mt-1 text-sm text-red-500">
                        {speakerFormErrors.format}
                      </p>
                    )}
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      variant="cyberpunk"
                      size="lg"
                      className="w-full"
                    >
                      Submit Speaker Request
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Tell Us What Events You Want Tab */}
      {activeTab === "events" && (
        <div className="min-h-screen flex items-center justify-center relative z-10">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 w-full py-12">
            <Card className="border-white/10 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-md overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(21,128,61,0.15)_0%,transparent_70%)] pointer-events-none" />
              <CardContent className="pt-16 pb-16 md:pt-20 md:pb-20 relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
                  Tell Us What Events You Want
                </h2>
                <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Help us shape the future of our community events. What would
                  you love to see?
                </p>

                {eventFormSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-green-700/20 border border-green-700/50 rounded-lg flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-700" />
                    <span className="text-green-700">
                      Thank you for your feedback! We'll take it into
                      consideration.
                    </span>
                  </motion.div>
                )}

                <form
                  onSubmit={handleEventSubmit}
                  className="max-w-2xl mx-auto space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="event-name"
                        className="block text-sm font-medium mb-2"
                      >
                        Name (Optional)
                      </label>
                      <input
                        id="event-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={eventFormData.name}
                        onChange={(e) =>
                          setEventFormData({
                            ...eventFormData,
                            name: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-zinc-50 focus:outline-none focus:border-green-700 focus:ring-1 focus:ring-green-700"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="event-email"
                        className="block text-sm font-medium mb-2"
                      >
                        Email (Optional)
                      </label>
                      <input
                        id="event-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={eventFormData.email}
                        onChange={(e) =>
                          setEventFormData({
                            ...eventFormData,
                            email: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-zinc-50 focus:outline-none focus:border-green-700 focus:ring-1 focus:ring-green-700"
                      />
                      {eventFormErrors.email && (
                        <p className="mt-1 text-sm text-red-500">
                          {eventFormErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-3">
                      Event Types of Interest
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {eventTypeOptions.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => toggleEventType(type)}
                          className={`px-4 py-2 rounded-lg border transition-all ${
                            eventFormData.eventTypes.includes(type)
                              ? "bg-green-700/20 border-green-700 text-green-700 shadow-[0_0_10px_rgba(21,128,61,0.3)]"
                              : "bg-black/40 border-white/10 text-muted-foreground hover:border-white/20"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="event-suggestion"
                      className="block text-sm font-medium mb-2"
                    >
                      What would you love to see?
                    </label>
                    <textarea
                      id="event-suggestion"
                      name="suggestion"
                      rows={4}
                      value={eventFormData.suggestion}
                      onChange={(e) =>
                        setEventFormData({
                          ...eventFormData,
                          suggestion: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-zinc-50 focus:outline-none focus:border-neon-primary focus:ring-1 focus:ring-neon-primary resize-none"
                      placeholder="Share your ideas for future events..."
                    />
                  </div>

                  {eventFormErrors.general && (
                    <p className="text-sm text-red-500">
                      {eventFormErrors.general}
                    </p>
                  )}

                  <div className="pt-4">
                    <Button
                      type="submit"
                      variant="cyberpunk"
                      size="lg"
                      className="w-full"
                    >
                      Submit Feedback
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </main>
  );
}
