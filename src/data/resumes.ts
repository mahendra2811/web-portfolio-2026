export type ResumeRole = "fd" | "fsd";

export interface ResumeEntry {
  role: ResumeRole;
  label: string;
  shortLabel: string;
  description: string;
  file: string;
  downloadName: string;
  updatingSoon: boolean;
}

export const resumes: Record<ResumeRole, ResumeEntry> = {
  fd: {
    role: "fd",
    label: "Resume",
    shortLabel: "Frontend",
    description: "Tailored for Developer roles.",
    file: "/resume/mahendra_resume_fd.pdf",
    downloadName: "Mahendra_Singh_Puniya_RESUME_FD.pdf",
    updatingSoon: true,
  },
  fsd: {
    role: "fsd",
    label: " Resume",
    shortLabel: "Full-Stack",
    description: "full-stack / software engineering roles.",
    file: "/resume/mahendra_resume_fsd.pdf",
    downloadName: "Mahendra_Singh_Puniya_RESUME_FSD.pdf",
    updatingSoon: true,
  },
};

export const defaultResumeRole: ResumeRole = "fsd";

export const updatingSoonNotice = {
  title: "Heads up — resumes are updating very soon",
  body: "I'm refreshing both the frontend and full-stack resumes shortly. In the meantime, the latest available version is below.",
} as const;

export function getResume(role: ResumeRole): ResumeEntry {
  return resumes[role];
}
