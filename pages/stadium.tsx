import dynamic from "next/dynamic";

const SeatingChartPage = dynamic(
  () => import("@/components/SeatingChart/SeatingChart"),
  { ssr: false }
);

export default function Stadium() {
  return <SeatingChartPage />;
}
