"use client";

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { TextInput, Button, Container, Title, Text, CopyButton, Notification, rem, Alert, Progress, Transition } from '@mantine/core';
import { Link as LinkIcon, Copy as CopyIcon, Check as CheckIcon, X as CloseIcon } from 'lucide-react';
import AutoClosingNotification from '../components/Notification';

export default function LinkShortener() {
  const apiURL = "http://127.0.0.1:13000/"
  const [originalLink, setOriginalLink] = useState('');
  const [shortenedLink, setShortenedLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(0);

  const handleShorten = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(apiURL + 'api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ link: originalLink }),
      });
      const { short } = await response.json();

      if (response.status > 399) {
        setTimer(100);
      } else {
        setShortenedLink(apiURL + short);
      }
    } catch (error) {
      setTimer(100);
      console.error('Link shortening failed', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => {
        setTimer(timer - 1);
      }, 30);
    }
  }, [timer]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
      <Head>
        <title>Link Shortener</title>
        <meta name="description" content="Shorten your long URLs with ease" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container
        className="w-full max-w-xl bg-white/30 backdrop-blur-lg border border-white/40 rounded-2xl shadow-xl p-8 relative overflow-hidden"
      >

        {/* Subtle background blur effect */}
        <div className="absolute -z-10 top-0 left-0 right-0 bottom-0 bg-white/10 backdrop-blur-sm rounded-2xl"></div>

        <div className="text-center mb-8">
          <Title
            order={1}
            className="text-4xl font-bold text-gray-800 mb-4"
          >
            Link Shortener
          </Title>
          <Text className="text-gray-600">
            Simplify your links with just one click
          </Text>
        </div>

        <div className="space-y-4">
          <TextInput
            value={originalLink}
            onChange={(event) => setOriginalLink(event.currentTarget.value)}
            placeholder="Enter your long URL here"
            leftSection={<LinkIcon size={20} className="text-gray-500" />}
            className="w-full"
            size="lg"
            radius="xl"
            variant="filled"
          />

          <Button
            onClick={handleShorten}
            loading={isLoading}
            className="w-full bg-blue-500 hover:bg-blue-600 transition-colors duration-300"
            size="lg"
            radius="xl"
          >
            Shorten Link
          </Button>

          {shortenedLink && (
            <div className="mt-4 bg-white/50 backdrop-blur-sm rounded-xl p-4 flex items-center justify-between">
              <Text
                className="text-gray-800 font-medium truncate mr-4"
                title={shortenedLink}
              >
                {shortenedLink}
              </Text>
              <CopyButton value={shortenedLink}>
                {({ copied, copy }) => (
                  <Button
                    onClick={copy}
                    variant="subtle"
                    className={`${copied
                      ? 'text-green-500'
                      : 'text-gray-600 hover:text-blue-500'
                      } transition-colors duration-300`}
                  >
                    {copied ? <CheckIcon size={20} /> : <CopyIcon size={20} />}
                  </Button>
                )}
              </CopyButton>
            </div>
          )}
                    <Transition
            mounted={timer > 0} // Control this with a state variable
            transition="slide-up"
            duration={400}
            timingFunction="ease"
          >
            {(styles) => (
              <Alert
                style={styles}
                variant="light"
                title="ERROR"
                icon={<CloseIcon size={20} />}
                radius="sm"
                color="red"
              >
                There was an error with your request. Please try again later.
                <Progress radius="xl" size="xs" value={timer} color="red" />
              </Alert>
            )}
          </Transition>
        </div>
      </Container>
    </div>

  );
}