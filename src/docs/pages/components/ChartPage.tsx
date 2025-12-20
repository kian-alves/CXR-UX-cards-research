import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { Guidance } from "@/docs/components/ProseBlock";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { ExampleCard } from "@/docs/components/ExampleCard";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  Area,
  AreaChart,
} from "recharts";
import { sampleData, chartColorVars } from "@/docs/utils/chartColors";

export default function ChartPage() {
  return (
    <ComponentPage
      title="Chart"
      description="Data visualization components built with Recharts and shadcn/ui chart primitives."
      status="beta"
      registryKey="chart"
    >
      <Section title="Overview">
        <Guidance>
          Charts use Recharts under the hood with a shadcn/ui wrapper for consistent styling.
          Colors are resolved from CSS variables (--chart-1 through --chart-5) for theme consistency.
        </Guidance>
        <ExampleCard title="Basic Bar Chart" description="Single series bar chart with axes and tooltip.">
          <BasicBarChartExample />
        </ExampleCard>
        <Guidance>
          <strong>When to use:</strong> Bar charts are ideal for comparing discrete categories or 
          showing changes over time with distinct periods.
        </Guidance>
      </Section>

      <Section title="Chart Types" description="Common chart types for different data visualization needs.">
        <div className="space-y-8">
          <ExampleCard title="Line Chart" description="Track trends over continuous data points.">
            <LineChartExample />
          </ExampleCard>
          <Guidance>
            <strong>When to use:</strong> Line charts excel at showing trends over time or 
            continuous data. Best for 5+ data points where you want to emphasize the overall pattern.
          </Guidance>

          <ExampleCard title="Multi-Series Bar Chart" description="Compare two data series side by side.">
            <MultiSeriesBarChartExample />
          </ExampleCard>
          <Guidance>
            <strong>When to use:</strong> Multi-series charts compare related metrics (e.g., revenue vs. expenses).
            Include a legend to differentiate series.
          </Guidance>

          <ExampleCard title="Area Chart" description="Filled line chart emphasizing volume.">
            <AreaChartExample />
          </ExampleCard>
          <Guidance>
            <strong>When to use:</strong> Area charts emphasize the magnitude of values over time.
            Good for showing cumulative totals or comparing parts of a whole.
          </Guidance>

          <ExampleCard title="Pie Chart" description="Show proportional distribution of data.">
            <PieChartExample />
          </ExampleCard>
          <Guidance>
            <strong>When to use:</strong> Pie charts show part-to-whole relationships.
            Limit to 5-6 segments for readability. Always include a legend.
          </Guidance>
        </div>
      </Section>

      <Section title="Data Shape" description="Expected data format for chart components.">
        <CodeBlock
          code={`// Basic single-series data
const data = [
  { month: "Jan", value: 186 },
  { month: "Feb", value: 305 },
  { month: "Mar", value: 237 },
];

// Multi-series data
const data = [
  { month: "Jan", revenue: 186, expenses: 80 },
  { month: "Feb", revenue: 305, expenses: 200 },
];

// Pie/distribution data (include fill for colors)
const data = [
  { name: "Desktop", value: 400, fill: "hsl(var(--chart-1))" },
  { name: "Mobile", value: 300, fill: "hsl(var(--chart-2))" },
];`}
        />
      </Section>

      <Section title="Chart Configuration" description="Define colors and labels via ChartConfig.">
        <CodeBlock
          code={`import { ChartConfig } from "@/components/ui/chart";

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
  expenses: {
    label: "Expenses",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

// Use with ChartContainer
<ChartContainer config={chartConfig}>
  <BarChart data={data}>
    <Bar dataKey="revenue" fill="var(--color-revenue)" />
    <Bar dataKey="expenses" fill="var(--color-expenses)" />
  </BarChart>
</ChartContainer>`}
        />
      </Section>

      <Section title="Accessibility">
        <div className="space-y-4 text-foreground">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Color is Not the Only Signal</h3>
            <p className="text-sm text-muted-foreground">
              Charts should not rely solely on color to convey meaning. Include:
            </p>
            <ul className="text-sm text-muted-foreground list-disc list-inside mt-2 space-y-1">
              <li>Clear legends with text labels</li>
              <li>Tooltips showing exact values on hover/focus</li>
              <li>Data tables as alternatives for screen readers</li>
              <li>Patterns or textures where possible</li>
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Non-text Contrast (WCAG 1.4.11)</h3>
            <p className="text-sm text-muted-foreground">
              Chart colors should maintain at least 3:1 contrast ratio against adjacent 
              colors. The chart color tokens are designed with this in mind.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Keyboard Navigation</h3>
            <p className="text-sm text-muted-foreground">
              Recharts tooltips are accessible via mouse hover. For full keyboard 
              accessibility, consider providing a companion data table.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

const data = [
  { month: "Jan", value: 186 },
  { month: "Feb", value: 305 },
];

const chartConfig = {
  value: {
    label: "Sales",
    color: "hsl(var(--chart-1))",
  },
};

function MyChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px]">
      <BarChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="value" fill="var(--color-value)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}`}
        />
      </Section>
    </ComponentPage>
  );
}

// ============================================
// Chart Example Components
// ============================================

const barChartConfig = {
  value: {
    label: "Value",
    color: chartColorVars.chart1,
  },
} satisfies ChartConfig;

function BasicBarChartExample() {
  return (
    <ChartContainer config={barChartConfig} className="h-[250px] w-full">
      <BarChart data={sampleData.monthly} accessibilityLayer>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="value" fill="var(--color-value)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}

const lineChartConfig = {
  value: {
    label: "Value",
    color: chartColorVars.chart2,
  },
} satisfies ChartConfig;

function LineChartExample() {
  return (
    <ChartContainer config={lineChartConfig} className="h-[250px] w-full">
      <LineChart data={sampleData.monthly} accessibilityLayer>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line
          type="monotone"
          dataKey="value"
          stroke="var(--color-value)"
          strokeWidth={2}
          dot={{ fill: "var(--color-value)" }}
        />
      </LineChart>
    </ChartContainer>
  );
}

const multiSeriesConfig = {
  revenue: {
    label: "Revenue",
    color: chartColorVars.chart1,
  },
  expenses: {
    label: "Expenses",
    color: chartColorVars.chart3,
  },
} satisfies ChartConfig;

function MultiSeriesBarChartExample() {
  return (
    <ChartContainer config={multiSeriesConfig} className="h-[250px] w-full">
      <BarChart data={sampleData.multiSeries} accessibilityLayer>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
        <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}

const areaChartConfig = {
  value: {
    label: "Value",
    color: chartColorVars.chart4,
  },
} satisfies ChartConfig;

function AreaChartExample() {
  return (
    <ChartContainer config={areaChartConfig} className="h-[250px] w-full">
      <AreaChart data={sampleData.monthly} accessibilityLayer>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area
          type="monotone"
          dataKey="value"
          stroke="var(--color-value)"
          fill="var(--color-value)"
          fillOpacity={0.3}
        />
      </AreaChart>
    </ChartContainer>
  );
}

const pieChartConfig = {
  desktop: {
    label: "Desktop",
    color: chartColorVars.chart1,
  },
  mobile: {
    label: "Mobile",
    color: chartColorVars.chart2,
  },
  tablet: {
    label: "Tablet",
    color: chartColorVars.chart3,
  },
  other: {
    label: "Other",
    color: chartColorVars.chart4,
  },
} satisfies ChartConfig;

function PieChartExample() {
  return (
    <ChartContainer config={pieChartConfig} className="h-[250px] w-full">
      <PieChart accessibilityLayer>
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Pie
          data={sampleData.distribution}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={80}
          paddingAngle={2}
        >
          {sampleData.distribution.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
