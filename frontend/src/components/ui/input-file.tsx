'use client';

import type React from 'react';
import Image from 'next/image';

import { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InputFileProps {
  id?: string;
  accept?: string;
  onChange?: (file: File | null) => void;
  className?: string;
}

export function InputFile({
  id = 'file',
  accept = 'image/*',
  onChange,
  className,
}: InputFileProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile);

    if (selectedFile && selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }

    if (onChange) {
      onChange(selectedFile);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    handleFileChange(selectedFile);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const selectedFile = e.dataTransfer.files?.[0] || null;
    handleFileChange(selectedFile);
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    if (onChange) {
      onChange(null);
    }
  };

  const triggerFileInput = () => {
    inputRef.current?.click();
  };

  return (
    <div className={cn('w-full max-w-sm', className)}>
      <div
        className={cn(
          'relative flex flex-col items-center justify-center rounded-md border-2 border-dashed p-6 transition-colors',
          isDragging
            ? 'border-primary bg-primary/5'
            : 'border-muted-foreground/25 hover:border-primary/50',
          file ? 'bg-muted/20' : ''
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={!file ? triggerFileInput : undefined}
        style={{ cursor: !file ? 'pointer' : 'default' }}>
        <Input
          ref={inputRef}
          id={id}
          type='file'
          accept={accept}
          onChange={handleInputChange}
          className='hidden'
        />

        {!file ? (
          <div className='flex flex-col items-center gap-2 text-center'>
            <Upload className='h-10 w-10 text-muted-foreground' />
            <div className='space-y-1'>
              <p className='text-sm font-medium'>
                Drag & drop or click to upload
              </p>
              <p className='text-xs text-muted-foreground'>
                {accept === 'image/*'
                  ? 'SVG, PNG, JPG or GIF'
                  : 'Upload your file here'}
              </p>
            </div>
          </div>
        ) : (
          <div className='flex w-full flex-col items-center gap-4'>
            {preview && (
              <div className='relative h-32 w-32 overflow-hidden rounded-md'>
                <Image
                  src={preview || '/placeholder.svg'}
                  alt='File preview'
                  width={128}
                  height={128}
                  className='object-cover h-full w-full'
                />
              </div>
            )}

            <div className='flex w-full items-center justify-between gap-2'>
              <span className='max-w-[180px] truncate text-sm'>
                {file.name}
              </span>
              <Button
                type='button'
                variant='ghost'
                size='sm'
                onClick={(e) => {
                  e.stopPropagation();
                  clearFile();
                }}
                className='h-8 w-8 p-0'>
                <X className='h-4 w-4' />
                <span className='sr-only'>Remove file</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
