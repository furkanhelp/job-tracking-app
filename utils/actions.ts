"use server";

import prisma from "./db";
import { auth } from "@clerk/nextjs/server";
import { JobType, CreateAndEditJobType, createAndEditJobSchema } from "./types";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import dayjs from "dayjs";
import { log } from "console";

async function authenticateAndRedirect(): Promise<string> {
  try {
    const { userId } = await auth();
    if (!userId) {
      redirect("/");
    }
    return userId;
  } catch (error) {
    console.error("Authentication error:", error);
    redirect("/");
  }
}

export async function createJobAction(
  values: CreateAndEditJobType
): Promise<JobType | null> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const userId = await authenticateAndRedirect();
    createAndEditJobSchema.parse(values);

    return await prisma.job.create({
      data: {
        ...values,
        clerkId: userId,
      },
    });
  } catch (error) {
    console.error("Create job error:", error);
    return null;
  }
}

type GetAllJobsActionTypes = {
  search?: string;
  jobStatus?: string;
  page?: number;
  limit?: number;
};

export async function getAllJobsAction({
  search,
  jobStatus,
  page = 1,
  limit = 10,
}: GetAllJobsActionTypes) {
  try {
    const userId = await authenticateAndRedirect();

    let whereClause: Prisma.JobWhereInput = { clerkId: userId };

    if (search) {
      whereClause = {
        ...whereClause,
        OR: [
          { position: { contains: search } },
          { company: { contains: search } },
        ],
      };
    }

    if (jobStatus && jobStatus !== "all") {
      whereClause = { ...whereClause, status: jobStatus };
    }

    const [jobs, count] = await Promise.all([
      prisma.job.findMany({
        where: whereClause,
        take: limit,
        skip: (page - 1) * limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.job.count({ where: whereClause }),
    ]);

    return {
      jobs,
      count,
      page,
      totalPages: Math.ceil(count / limit),
    };
  } catch (error) {
    console.error("Get jobs error:", error);
    return { jobs: [], count: 0, page: 1, totalPages: 0 };
  }
}

// DeleteJob
export async function deleteJobAction(id: string): Promise<JobType | null> {
  try {
    const userId = await authenticateAndRedirect();

    return await prisma.job.delete({
      where: {
        id,
        clerkId: userId,
      },
    });
  } catch (error) {
    console.error("Delete job error:", error);
    return null;
  }
}

// Get the job info
export async function getSingleJobAction(id: string): Promise<JobType | null> {
  try {
    const userId = await authenticateAndRedirect();

    const job = await prisma.job.findUnique({
      where: {
        id,
        clerkId: userId,
      },
    });

    if (!job) {
      redirect("/jobs");
    }

    return job;
  } catch (error) {
    console.error("Get single job error:", error);
    redirect("/jobs");
  }
}

// Update Job
export async function updateJobAction(
  id: string,
  values: CreateAndEditJobType
): Promise<JobType | null> {
  try {
    const userId = await authenticateAndRedirect();
    createAndEditJobSchema.parse(values);

    return await prisma.job.update({
      where: {
        id,
        clerkId: userId,
      },
      data: values,
    });
  } catch (error) {
    console.error("Update job error:", error);
    return null;
  }
}

// Stats Section
export async function getStatsAction(): Promise<{
  pending: number;
  interview: number;
  declined: number;
}> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const userId = await authenticateAndRedirect();

    const stats = await prisma.job.groupBy({
      by: ["status"],
      _count: { status: true },
      where: { clerkId: userId },
    });

    // Initialize default stats
    const defaultStats = {
      pending: 0,
      interview: 0,
      declined: 0,
    };

    // Type guard to check if status is valid
    const isValidStatus = (
      status: string
    ): status is keyof typeof defaultStats => {
      return status in defaultStats;
    };

    // Update stats from database
    stats.forEach((item) => {
      if (isValidStatus(item.status)) {
        defaultStats[item.status] = item._count.status;
      }
    });

    return defaultStats;
  } catch (error) {
    console.error("Get stats error:", error);
    return { pending: 0, interview: 0, declined: 0 };
  }
}


export async function getChartsDataAction(): Promise<
  Array<{ date: string; count: number }>
> {
  try {
    const userId = await authenticateAndRedirect();
    const sixMonthsAgo = dayjs().subtract(6, "month").toDate();

    const jobs = await prisma.job.findMany({
      where: {
        clerkId: userId,
        createdAt: { gte: sixMonthsAgo },
      },
      orderBy: { createdAt: "asc" },
    });

    return jobs.reduce((acc, job) => {
      const date = dayjs(job.createdAt).format("MMM YY");
      const existingEntry = acc.find((entry) => entry.date === date);

      if (existingEntry) {
        existingEntry.count++;
      } else {
        acc.push({ date, count: 1 });
      }

      return acc;
    }, [] as Array<{ date: string; count: number }>);
  } catch (error) {
    console.error("Get charts data error:", error);
    return [];
  }
}