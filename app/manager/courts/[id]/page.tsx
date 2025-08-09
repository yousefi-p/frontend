interface CourtProps {
    params: { id: string };
    searchParams?: Record<string, string>;
}

export default function Court({ params, searchParams }: CourtProps) {
    return (
        <p>
            {params.id}
        </p>
    )
}