import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { githubStorage } from '@/lib/githubStorage';

export const GitHubConfig = () => {
  const [token, setToken] = useState('');
  const [owner, setOwner] = useState('');
  const [repo, setRepo] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!token || !owner || !repo) {
      setError('All fields are required');
      return;
    }

    try {
      githubStorage.configure(token, owner, repo);
    } catch (err) {
      setError('Failed to configure GitHub storage');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Configure GitHub Storage</CardTitle>
          <CardDescription>
            Set up GitHub as your database to sync workout data across devices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="token">GitHub Personal Access Token</Label>
              <Input
                id="token"
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="ghp_xxxxxxxxxxxx"
              />
              <p className="text-xs text-muted-foreground">
                Create a token at GitHub Settings → Developer settings → Personal access tokens
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="owner">Repository Owner</Label>
              <Input
                id="owner"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                placeholder="your-username"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="repo">Repository Name</Label>
              <Input
                id="repo"
                value={repo}
                onChange={(e) => setRepo(e.target.value)}
                placeholder="workout-tracker-data"
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full">
              Configure GitHub Storage
            </Button>
          </form>

          <div className="mt-6 space-y-2 text-sm text-muted-foreground">
            <p><strong>Setup Instructions:</strong></p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Create a GitHub repository for storing workout data</li>
              <li>Generate a Personal Access Token with 'repo' permissions</li>
              <li>Enter your details above to sync data across devices</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};