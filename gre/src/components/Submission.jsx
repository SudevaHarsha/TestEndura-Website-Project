// pages/submission.js

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const Submission = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">Test Submitted!</h1>

      <Card className="mt-4 rounded-xl p-6">
        <CardHeader>
          <CardTitle>Thank you for completing the GRE mock test.</CardTitle>
        </CardHeader>
        <CardDescription>
          <p>Your test has been successfully submitted.</p>
          <p>If you'd like to review your answers or retake the test, please click the button below:</p>
        </CardDescription>
      </Card>

      <div className="mt-8">
        <Link href="/">
          <Button variant="primary">Return to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default Submission;
