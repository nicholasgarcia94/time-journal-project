import { IActivity, Activity } from "../models/IActivity";

export class ActivityService {
  public async getActivities(): Promise<IActivity[]> {
    const response: Response = await fetch("/api/express_backend");
    const body = await response.json();
    const activities: IActivity[] = body.map(
      (_: { id: number; name: string; duration: number; date: Date }) => {
        return new Activity(_.id, _.name, _.duration, _.date);
      }
    );

    if (response.status !== 200) {
      throw Error(
        `Response status: ${response.status}. Response body: ${body}`
      );
    }
    return activities;
  }

  public async postActivity(
    name: string | null,
    duration: number
  ): Promise<void> {
    await fetch("/addActivity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, duration }),
      });
  }

  public async deleteActivity(id: number): Promise<void> {
    const response: Response = await fetch(
      `http://localhost:3000/deleteActivity/${id}`,
      {
        method: "DELETE",
      }
    );
    console.log(await response.text());
  };
}

export const activityService = new ActivityService();

// export const getActivities = async (): Promise<IActivity[]> => {
//     const response: Response = await fetch("/api/express_backend");
//     const body = await response.json();
//     const activities: IActivity[] = body.map((_: { id: number; name: string; duration: number; date: Date; }) => {
//            return new Activity(_.id, _.name, _.duration, _.date);
//         });

//     if (response.status !== 200) {
//         throw Error(`Response status: ${response.status}. Response body: ${body}`);
//       }
//     return activities;
// };

// export const postActivity = async (
//   name: string | null,
//   duration: number
// ): Promise<void> => {
//   await fetch("/addActivity", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ name, duration }),
//   });
// };

// export const deleteActivity = async (id: number): Promise<void> => {
//   const response: Response = await fetch(
//     `http://localhost:3000/deleteActivity/${id}`,
//     {
//       method: "DELETE",
//     }
//   );
//   console.log(await response.text());
// };
