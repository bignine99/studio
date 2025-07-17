// @ts-nocheck
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Upload, Loader2, TriangleAlert, AlertCircle } from 'lucide-react';
import { identifyHazardsAction } from '@/app/actions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type Hazard = string;

export default function HazardIdentifier() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [hazards, setHazards] = useState<Hazard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file.');
      return;
    }
    setError(null);
    setHazards([]);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const handleIdentifyHazards = async () => {
    if (!imagePreview) return;
    setIsLoading(true);
    setError(null);

    const result = await identifyHazardsAction(imagePreview);

    setIsLoading(false);
    if ('error' in result) {
      setError(result.error);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: result.error,
      });
    } else {
      setHazards(result.hazards);
      if(result.hazards.length === 0) {
        toast({
          title: "No Hazards Found",
          description: "Our AI analysis did not find any potential hazards in this image.",
        });
      }
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>AI Hazard Identifier</CardTitle>
        <CardDescription>
          Upload a photo of a construction site to automatically identify potential safety hazards.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-2">
        <div 
          className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 text-center h-96 transition-colors hover:border-primary"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
          {imagePreview ? (
            <div className="relative w-full h-full">
              <Image src={imagePreview} alt="Site preview" layout="fill" objectFit="contain" className="rounded-md" />
            </div>
          ) : (
            <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
              <Upload className="w-12 h-12 text-muted-foreground" />
              <p className="mt-2 font-semibold">Click to upload or drag & drop</p>
              <p className="text-sm text-muted-foreground">PNG, JPG, or GIF</p>
            </label>
          )}
        </div>
        <div className="flex flex-col space-y-4">
          <Button onClick={handleIdentifyHazards} disabled={!imagePreview || isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              'Identify Hazards'
            )}
          </Button>

          {isLoading && (
             <div className="flex flex-col items-center justify-center space-y-2 text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p>Analyzing image with AI...</p>
                <p className="text-xs">This may take a moment.</p>
             </div>
          )}
          
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {hazards.length > 0 && (
            <div className="space-y-3">
               <h3 className="font-semibold">Potential Hazards Found:</h3>
               <ul className="space-y-2">
                 {hazards.map((hazard, index) => (
                   <li key={index} className="flex items-start">
                     <TriangleAlert className="w-5 h-5 mr-2 mt-0.5 text-accent flex-shrink-0" />
                     <span>{hazard}</span>
                   </li>
                 ))}
               </ul>
            </div>
          )}

          {hazards.length === 0 && !isLoading && !error && imagePreview && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Ready for Analysis</AlertTitle>
              <AlertDescription>
                Click the "Identify Hazards" button to begin the AI analysis of the uploaded image.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
