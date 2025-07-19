"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const TestPage = () => {
  const [response, setResponse] = useState<string | null>(null);

  const handleWebhookCall = async () => {
    try {
      const res = await fetch("/api/webhook/stripe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Stripe-Signature": "test_signature", // Fake signature; real webhook won't accept it
        },
        body: JSON.stringify({
          type: "checkout.session.completed",
          data: {
            object: {
              id: "cs_test_123456789",
              metadata: {
                userId: "user_test",
                courseId: "course_test",
                enrollmentId: "enrollment_test",
              },
            },
          },
        }),
      });

      const text = await res.text();
      setResponse(`Status: ${res.status} - ${text}`);
    } catch (err: any) {
      setResponse(`Error: ${err.message}`);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Manual Stripe Webhook Test</h1>
      <Button onClick={handleWebhookCall}>Trigger Webhook</Button>

      {response && (
        <div className="mt-4 p-2 border rounded">
          <pre>{response}</pre>
        </div>
      )}
    </div>
  );
};

export default TestPage;
