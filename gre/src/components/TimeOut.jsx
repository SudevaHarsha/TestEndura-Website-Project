"use client"

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const Timeout = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden">
        <img className="w-full" src="/timeout-image.jpg" alt="Timeout Image" />
        <div className="p-6">
          <h1 className="text-3xl font-semibold mb-4">Time Out!</h1>
          <Card>
            <CardHeader>
              <CardTitle>Oops! Your time ran out.</CardTitle>
            </CardHeader>
            <CardDescription>
              <p>Unfortunately, your time for the GRE mock test has expired.</p>
              <p>If you'd like to try the test again, please click the button below:</p>
            </CardDescription>
          </Card>
          <div className="mt-6">
            <Link href="/">
              <Button variant="primary">Restart Test</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeout;
