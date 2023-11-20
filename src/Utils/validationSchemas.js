import { z } from 'zod';

export const basicDetailsSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  mobileNumber: z.string(),
  dateOfBirth: z.string(),
});

const validateFileSize = (maxSizeKB) => (value, ctx) => {
  if (!value || typeof value.size !== 'number') {
    return value; // No file, no validation
  }

  const sizeKB = value.size / 1024;

  if (sizeKB > maxSizeKB) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `File size must be less than or equal to ${maxSizeKB}KB`,
    });
  }

  return value;
};

export const documentCollectionSchema = z.object({
  class10Marksheet: z.object({
    name: z.string().min(1, { message: 'Class 10 Marksheet is required' }),
    type: z.string().refine((value) => value.includes('pdf') || value.includes('doc'), {
      message: 'Only PDF or DOC files are allowed',
    }),
    size: z.number().optional().transform((value, ctx) => {
      if (value !== undefined && value > 30) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'File size must be less than or equal to 300',
        });
      }
      return value;
    }),
  }),
  class12Marksheet: z.object({
    name: z.string().min(1, { message: 'Class 12 Marksheet is required' }),
    type: z.string().refine((value) => value.includes('pdf') || value.includes('doc'), {
      message: 'Only PDF or DOC files are allowed',
    }),
    size: z.number().optional().transform((value, ctx) => {
      if (value !== undefined && value > 300) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'File size must be less than or equal to 300',
        });
      }
      return value;
    }),
  }),
  graduationMarksheet: z.object({
    name: z.string().min(1, { message: 'Graduation Marksheet is required' }),
    type: z.string().refine((value) => value.includes('pdf') || value.includes('doc'), {
      message: 'Only PDF or DOC files are allowed',
    }),
    size: z.number().optional().transform((value, ctx) => {
      if (value !== undefined && value > 300) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'File size must be less than or equal to 300',
        });
      }
      return value;
    }),
  }),
  postGraduationMarksheet: z.object({
    type: z.string().refine((value) => value.includes('pdf') || value.includes('doc'), {
      message: 'Only PDF or DOC files are allowed',
    }),
    size: z.number().optional().transform((value, ctx) => {
      if (value !== undefined && value > 300) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'File size must be less than or equal to 300',
        });
      }
      return value;
    }),
  }).optional(),
  resume: z.object({
    name: z.string().min(1, { message: 'Resume/CV is required' }),
    type: z.string().refine((value) => value.includes('pdf') || value.includes('doc'), {
      message: 'Only PDF or DOC files are allowed',
    }),
    size: z.number().optional().transform(validateFileSize(3), {
      message: 'File size must be less than or equal to 300KB',
    }),
  }),
  recommendationLetter: z.object({
    type: z.string().refine((value) => value.includes('pdf') || value.includes('doc'), {
      message: 'Only PDF or DOC files are allowed',
    }),
    size: z.number().optional().transform((value, ctx) => {
      if (value !== undefined && value > 300) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'File size must be less than or equal to 300',
        });
      }
      return value;
    }),
  }).optional(),
  salarySlips: z.object({
    type: z.string().refine((value) => value.includes('pdf') || value.includes('doc'), {
      message: 'Only PDF or DOC files are allowed',
    }),
    size: z.number().optional().transform((value, ctx) => {
      if (value !== undefined && value > 300) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'File size must be less than or equal to 300',
        });
      }
      return value;
    }),
  }).optional(),
  others: z.object({
    type: z.string().refine((value) => value.includes('pdf') || value.includes('doc'), {
      message: 'Only PDF or DOC files are allowed',
    }),
    size: z.number().optional().transform((value, ctx) => {
      if (value !== undefined && value > 300) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'File size must be less than or equal to 300',
        });
      }
      return value;
    }),
  }).optional(),
});

const validateWordCount = (maxWords) => (value, ctx) => {
  if (!value) {
    return value; // No value, no validation
  }

  const wordCount = value.split(/\s+/).filter((word) => word).length;

  if (wordCount > maxWords) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Answer must be limited to ${maxWords} words`,
    });
  }

  return value;
};

export const statementOfPurposeSchema = z.object({
  question1: z.string().min(1, { message: 'This field is required' }).transform(validateWordCount(300), {
    message: 'Maximum 300 words allowed',
  }),
  question2: z.string().min(1, { message: 'This field is required' }).transform(validateWordCount(300), {
    message: 'Maximum 300 words allowed',
  }),
  question3: z.string().min(1, { message: 'This field is required' }).transform(validateWordCount(300), {
    message: 'Maximum 300 words allowed',
  }),
});

export const interviewAvailabilitySchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  location: z.string().min(1, { message: 'Location is required' }),
  interviewDate: z.string().min(1, { message: 'Interview Date is required' }),
  interviewTime: z.string().min(1, { message: 'Interview Time is required' }),
  timeZone: z.string().min(1, { message: 'Time Zone is required' }),
  interviewMedium: z.string().min(1, { message: 'Interview Medium is required' }),
});

