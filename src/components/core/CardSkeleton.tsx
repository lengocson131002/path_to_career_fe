import { Card, CardProps, Skeleton } from "antd";

function CardSkeleton({
  loading,
  hasTitle,
  count,
  children,
  ...props
}: {
  count?: number;
  hasTitle?: boolean;
  loading?: boolean;
  children: JSX.Element | JSX.Element[];
} & CardProps) {
  if (loading) {
    return (
      <>
        {Array.from({ length: count ?? 1 }).map((skeleton) => (
          <Card
            className={props.className}
            title={
              hasTitle ? (
                <Skeleton
                  className="w-1/2"
                  active={true}
                  loading={true}
                  paragraph={false}
                />
              ) : null
            }
            extra={null}
          >
            <Skeleton active={true} loading={true} />
          </Card>
        ))}
      </>
    );
  }
  return <div className={props.className}>{children}</div>;
}

export default CardSkeleton;
