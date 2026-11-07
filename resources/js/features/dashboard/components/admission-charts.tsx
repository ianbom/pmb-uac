import { type ReactNode, useId } from 'react';
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Label,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { dateLabel, number, percentage } from '../data';

// Dashboard-local chart shell: shared UI components remain untouched.
export function ChartContainer({
    children,
    label,
}: {
    children: ReactNode;
    label: string;
}) {
    return (
        <div
            role="img"
            aria-label={label}
            className="h-64 min-w-0 text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line]:stroke-border"
        >
            <ResponsiveContainer width="100%" height="100%">
                {children as React.ReactElement}
            </ResponsiveContainer>
        </div>
    );
}
function ChartTooltipContent({
    active,
    payload,
    label,
}: {
    active?: boolean;
    payload?: ReadonlyArray<{
        value?: number | string;
        name?: number | string;
    }>;
    label?: ReactNode;
}) {
    if (!active || !payload?.length) return null;
    return (
        <div className="rounded-lg border bg-popover p-3 text-xs text-popover-foreground shadow-sm">
            <p className="mb-1 font-medium">{label}</p>
            {payload.map((p, i) => (
                <p key={i}>
                    {p.name === 'count' ? 'Pendaftar' : p.name}:{' '}
                    <strong>{number(Number(p.value ?? 0))}</strong>
                </p>
            ))}
        </div>
    );
}
function DataView({ rows }: { rows: { name: string; count: number }[] }) {
    return (
        <details className="mt-4 text-xs">
            <summary className="cursor-pointer rounded py-2 text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring">
                Lihat data grafik
            </summary>
            <div className="mt-2 max-h-48 overflow-auto">
                <table className="w-full text-left">
                    <caption className="sr-only">
                        Data grafik dalam bentuk tabel
                    </caption>
                    <thead>
                        <tr>
                            <th className="p-2">Kategori / periode</th>
                            <th className="p-2 text-right">Pendaftar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((r) => (
                            <tr key={r.name} className="border-t">
                                <td className="p-2">{r.name}</td>
                                <td className="p-2 text-right tabular-nums">
                                    {number(r.count)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </details>
    );
}
export function ChartCard({
    title,
    description,
    children,
    action,
}: {
    title: string;
    description: string;
    children: ReactNode;
    action?: ReactNode;
}) {
    return (
        <Card className="h-full min-w-0 gap-5 shadow-none">
            <CardHeader className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <CardTitle className="text-base">{title}</CardTitle>
                    <CardDescription className="mt-1.5 text-xs leading-relaxed">
                        {description}
                    </CardDescription>
                </div>
                {action}
            </CardHeader>
            <CardContent>{children}</CardContent>
        </Card>
    );
}
export function RegistrationTrendChart({
    data,
}: {
    data: { date: string; count: number }[];
}) {
    const id = useId().replaceAll(':', '');
    return (
        <>
            <ChartContainer label="Jumlah pendaftar harian pada periode terpilih">
                <AreaChart
                    data={data}
                    margin={{ left: -24, right: 8, top: 12, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
                            <stop
                                offset="0%"
                                stopColor="var(--chart-1)"
                                stopOpacity={0.22}
                            />
                            <stop
                                offset="100%"
                                stopColor="var(--chart-1)"
                                stopOpacity={0.01}
                            />
                        </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} strokeDasharray="3 5" />
                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        minTickGap={30}
                        tickFormatter={(d) =>
                            dateLabel(String(d)).replace(' 2026', '')
                        }
                    />
                    <YAxis
                        allowDecimals={false}
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip
                        content={<ChartTooltipContent />}
                        labelFormatter={(d) => dateLabel(String(d))}
                    />
                    <Area
                        name="Pendaftar"
                        type="monotone"
                        dataKey="count"
                        stroke="var(--chart-1)"
                        strokeWidth={2}
                        fill={`url(#${id})`}
                        isAnimationActive={false}
                        activeDot={{
                            r: 4,
                            stroke: 'var(--card)',
                            strokeWidth: 2,
                        }}
                    />
                </AreaChart>
            </ChartContainer>
            <DataView
                rows={data.map((d) => ({
                    name: dateLabel(d.date),
                    count: d.count,
                }))}
            />
        </>
    );
}
export function StudyProgramChart({
    data,
}: {
    data: { name: string; count: number }[];
}) {
    const top = data.slice(0, 5);
    return (
        <ChartCard
            title="Peminatan Program Studi"
            description="Lima program studi dengan jumlah pendaftar terbanyak."
        >
            <div className="flex gap-3">
                <div className="flex h-64 w-[46%] shrink-0 flex-col justify-around pb-6 text-xs leading-snug">
                    {top.map((d) => (
                        <span key={d.name}>{d.name}</span>
                    ))}
                </div>
                <div className="min-w-0 flex-1">
                    <ChartContainer label="Peringkat peminatan lima program studi">
                        <BarChart
                            data={top}
                            layout="vertical"
                            margin={{ left: 0, right: 8 }}
                        >
                            <CartesianGrid horizontal={false} />
                            <XAxis
                                type="number"
                                allowDecimals={false}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis dataKey="name" type="category" hide />
                            <Tooltip
                                content={<ChartTooltipContent />}
                                cursor={{ fill: 'var(--muted)', opacity: 0.5 }}
                            />
                            <Bar
                                name="Pendaftar"
                                dataKey="count"
                                fill="var(--chart-1)"
                                radius={[0, 4, 4, 0]}
                                barSize={14}
                                isAnimationActive={false}
                            />
                        </BarChart>
                    </ChartContainer>
                </div>
            </div>
            <DataView rows={top} />
        </ChartCard>
    );
}
export function PaymentStatusChart({
    data,
}: {
    data: { name: string; count: number; fill: string }[];
}) {
    const total = data.reduce((sum, p) => sum + p.count, 0);
    return (
        <ChartCard
            title="Status Pembayaran"
            description="Distribusi biaya pendaftaran, tidak termasuk peserta bebas biaya."
        >
            <div className="grid items-center gap-3 sm:grid-cols-2">
                <ChartContainer
                    label={`Status pembayaran ${number(total)} pendaftar wajib bayar`}
                >
                    <PieChart>
                        <Tooltip content={<ChartTooltipContent />} />
                        <Pie
                            data={data}
                            dataKey="count"
                            nameKey="name"
                            innerRadius="65%"
                            outerRadius="85%"
                            paddingAngle={3}
                            stroke="var(--card)"
                            strokeWidth={2}
                            isAnimationActive={false}
                        >
                            {data.map((p) => (
                                <Cell key={p.name} fill={p.fill} />
                            ))}
                            <Label
                                position="center"
                                content={({ viewBox }) =>
                                    viewBox && 'cx' in viewBox ? (
                                        <text
                                            x={viewBox.cx}
                                            y={viewBox.cy}
                                            textAnchor="middle"
                                            fill="var(--foreground)"
                                        >
                                            <tspan
                                                x={viewBox.cx}
                                                dy="-2"
                                                className="text-3xl font-semibold"
                                            >
                                                {number(total)}
                                            </tspan>
                                            <tspan
                                                x={viewBox.cx}
                                                dy="23"
                                                fill="var(--muted-foreground)"
                                                className="text-xs"
                                            >
                                                Wajib bayar
                                            </tspan>
                                        </text>
                                    ) : null
                                }
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
                <ul className="space-y-5">
                    {data.map((p) => (
                        <li key={p.name} className="text-xs">
                            <div className="flex items-center gap-2">
                                <span
                                    className="size-2.5 rounded-sm"
                                    style={{ background: p.fill }}
                                />
                                <span>{p.name}</span>
                            </div>
                            <div className="mt-1.5 flex justify-between pl-4.5">
                                <strong className="text-base tabular-nums">
                                    {number(p.count)}
                                </strong>
                                <span className="text-muted-foreground">
                                    {percentage(p.count, total)}%
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            {total === 0 && (
                <p className="text-sm text-muted-foreground">
                    Tidak ada pendaftar wajib bayar.
                </p>
            )}
            <DataView rows={data} />
        </ChartCard>
    );
}
