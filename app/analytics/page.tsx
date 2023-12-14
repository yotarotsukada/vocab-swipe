import { NextPage } from "next";
import { createSupabaseClient } from "../_utils/supabase";

export const revalidate = 10000;
const Page: NextPage = async () => {
  const supabase = createSupabaseClient();
  const { data: logs } = await supabase.from("swipe_log").select("*");
  const { data: cards } = await supabase.from("card").select("*");

  const correctNum = (logs ?? []).filter((l) => l.is_ok).length;
  const rate = !!logs?.length
    ? ((100 * correctNum) / logs?.length).toFixed(1)
    : "-";

  return (
    <>
      <div className="p-6 flex flex-col gap-4">
        <p className="text-lg">
          Current: {correctNum}/{(logs ?? []).length} ({rate}%)
        </p>
        <div className="flex flex-col gap-2">
          {cards?.map((card) => {
            const log = (logs ?? []).filter((log) => log.card_id === card.id);
            return (
              <li key={card.id}>
                {card.word} - {log.filter((l) => l.is_ok).length}/{log.length}
              </li>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Page;
