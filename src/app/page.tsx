"use client";

import { useState } from "react";

// Types
interface AssessmentData {
  name: string;
  email: string;
  responses: boolean[]; // 10 responses, true=yes, false=no
}

// STATE Framework pillars (placeholder - waiting for Simon's input)
const PILLARS = [
  { name: "State", questions: ["Q1", "Q2"] },
  { name: "Tools", questions: ["Q1", "Q2"] },
  { name: "Actions", questions: ["Q1", "Q2"] },
  { name: "Triggers", questions: ["Q1", "Q2"] },
  { name: "Execution", questions: ["Q1", "Q2"] },
];

export default function Home() {
  const [step, setStep] = useState<"intro" | "assessment" | "email" | "results">("intro");
  const [currentPillar, setCurrentPillar] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<boolean[]>([]);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleStart = () => setStep("assessment");

  const handleResponse = (answer: boolean) => {
    const newResponses = [...responses, answer];
    setResponses(newResponses);

    if (currentQuestion < 1) {
      setCurrentQuestion(1);
    } else {
      if (currentPillar < PILLARS.length - 1) {
        setCurrentPillar(currentPillar + 1);
        setCurrentQuestion(0);
      } else {
        // Done with assessment
        setStep("email");
      }
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send to Resend API
    setSubmitted(true);
    setStep("results");
  };

  const calculateScore = () => responses.filter(Boolean).length;

  const getRiskTier = (score: number) => {
    if (score <= 2) return { label: "Critical Risk", color: "red" };
    if (score <= 4) return { label: "High Risk", color: "orange" };
    if (score <= 6) return { label: "Developing", color: "yellow" };
    if (score <= 8) return { label: "Production-Ready", color: "blue" };
    return { label: "STATE-Compliant", color: "green" };
  };

  // Intro Screen
  if (step === "intro") {
    return (
      <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-4">
        <div className="max-w-2xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Is your AI agent<br />production-ready?
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Run it through the STATE framework. Get a scored readiness report
            in under 5 minutes.
          </p>
          <button
            onClick={handleStart}
            className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-200 transition"
          >
            Start Assessment →
          </button>
          <p className="mt-6 text-sm text-gray-500">
            10 questions · 5 minutes · No sign-up required
          </p>
        </div>
      </main>
    );
  }

  // Assessment Screen
  if (step === "assessment") {
    const pillar = PILLARS[currentPillar];
    const progress = ((currentPillar * 2 + currentQuestion + 1) / 10) * 100;

    return (
      <main className="min-h-screen bg-gray-950 text-white p-4">
        <div className="max-w-xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Question {currentPillar * 2 + currentQuestion + 1} of 10
            </p>
          </div>

          {/* Pillar Section */}
          <div className="mb-6">
            <span className="text-sm text-gray-400 uppercase tracking-wider">
              Pillar {currentPillar + 1} of 5
            </span>
            <h2 className="text-2xl font-bold">{pillar.name}</h2>
          </div>

          {/* Question */}
          <div className="bg-gray-900 rounded-xl p-6 mb-6">
            <p className="text-lg">
              {pillar.questions[currentQuestion]}
            </p>
          </div>

          {/* Answers */}
          <div className="flex gap-4">
            <button
              onClick={() => handleResponse(true)}
              className="flex-1 bg-green-600 hover:bg-green-700 py-4 rounded-lg font-semibold transition"
            >
              Yes
            </button>
            <button
              onClick={() => handleResponse(false)}
              className="flex-1 bg-red-600 hover:bg-red-700 py-4 rounded-lg font-semibold transition"
            >
              No
            </button>
          </div>
        </div>
      </main>
    );
  }

  // Email Gate
  if (step === "email") {
    return (
      <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full">
          <h1 className="text-3xl font-bold mb-4 text-center">
            Where should we send your report?
          </h1>
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">First Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:border-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:border-white"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-white text-gray-900 py-4 rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              Get My Score →
            </button>
          </form>
        </div>
      </main>
    );
  }

  // Results Screen
  const score = calculateScore();
  const tier = getRiskTier(score);

  return (
    <main className="min-h-screen bg-gray-950 text-white p-4">
      <div className="max-w-2xl mx-auto">
        {/* Score */}
        <div className="text-center mb-8">
          <p className="text-gray-400 mb-2">Your Score</p>
          <div className="text-7xl font-bold mb-2">{score}/10</div>
          <span
            className={`inline-block px-4 py-1 rounded-full text-sm font-semibold bg-${tier.color}-600`}
          >
            {tier.label}
          </span>
        </div>

        {/* Per-Pillar Breakdown */}
        <div className="bg-gray-900 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Pillar Breakdown</h3>
          <div className="space-y-3">
            {PILLARS.map((pillar, i) => {
              const pillarScore = responses.slice(i * 2, i * 2 + 2).filter(Boolean).length;
              return (
                <div key={i} className="flex items-center justify-between">
                  <span>{pillar.name}</span>
                  <span className="font-mono">{pillarScore}/2</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-gray-900 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Top Recommendations</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-300">
            <li>Focus on your lowest-scoring pillar first</li>
            <li>Review the STATE framework documentation</li>
            <li>Consider a full system audit</li>
          </ol>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
            Book a STATE Readiness Review →
          </button>
        </div>
      </div>
    </main>
  );
}
