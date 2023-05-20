import { Card, CardProps, Skeleton } from "antd";

function CardSkeleton({
  loading,
  children,
  ...props
}: {
  loading?: boolean;
  children: React.ReactNode | React.ReactNode[];
} & CardProps) {
  if (loading) {
    return (
      <Card
        {...props}
        title={
          props.title ? (
            <Skeleton
              className="w-1/2"
              active={loading}
              loading={loading}
              paragraph={false}
            />
          ) : null
        }
        extra={null}
      >
        <Skeleton active={loading} loading={loading} />
      </Card>
    );
  }
  return <Card {...props}>{children}</Card>;
}

export default CardSkeleton;
