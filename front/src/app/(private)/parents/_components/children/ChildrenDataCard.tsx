import type { ChildrenType } from "@/provider/AuthProvider";
import { api } from "../../../../../../axios";
import { useEffect, useState } from "react";

type ChildrenDataCardProps = {
  child: ChildrenType;
};

export const ChildrenDataCard = ({ child }: ChildrenDataCardProps) => {
  type Lesson = {
    lessonName: string;
    taskDescription: string;
    images?: string[];
  };
  type Assignment = {
    _id: string;
    teacher: string;
    taskEndSchedule: string;
    childrens: Array<string | { _id: string }>;
    lessons?: Lesson[];
  };

  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getChildrenAssignment = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await api.get<{ assignments: Assignment[] }>(
        `/assignment/get/${child.teacher}`
      );

      const filtered = data.assignments.filter((a) =>
        a.childrens?.some(
          (c) => (typeof c === "string" ? c : c._id) === child._id
        )
      );
      setAssignments(filtered);
    } catch {
      throw new Error("Fetch teacher data failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!child?.teacher || !child?._id) return;
    getChildrenAssignment();
  }, [child?._id, child?.teacher]);

  return (
    <div>
      {loading && <div>Loading assignments...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {!loading && assignments.length > 0 && (
        <div className="mt-2">
          {assignments.map((a) => (
            <div key={a._id} className="border p-2 rounded mb-2">
              <div className="text-sm text-gray-600">
                Due: {new Date(a.taskEndSchedule).toLocaleString()}
              </div>
              {a.lessons?.length ? (
                <ul className="list-disc pl-4">
                  {a.lessons.map((l, idx) => (
                    <li key={idx}>
                      <span className="font-medium">{l.lessonName}</span>
                      {l.taskDescription ? ` — ${l.taskDescription}` : ""}
                    </li>
                  ))}
                </ul>
              ) : (
                <div>No lessons</div>
              )}
            </div>
          ))}
        </div>
      )}
      {!loading && assignments.length === 0 && (
        <div>No assignments for this child.</div>
      )}
    </div>
  );
};
