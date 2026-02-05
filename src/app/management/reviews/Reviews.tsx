import PageLayout from "@/components/common/page-layout";
import {
  reviewsColumns,
  type Review,
} from "@/components/management/reviews/reviews-columns";
import { ReviewsFilter } from "@/components/management/reviews/reviews-filter";
import { DataTable } from "@/components/ui/data-table";
import PageHeader from "@/components/ui/page-header";

const Reviews = () => {
  return (
    <PageLayout>
      <div className="flex flex-col md:flex-row md:justify-between gap-2">
        <PageHeader
          title="Reviews"
          description="User all Platform Users"
          length={reviews.length}
        />
        <ReviewsFilter />
      </div>
      <DataTable columns={reviewsColumns} data={reviews} meta={meta} />
    </PageLayout>
  );
};

export default Reviews;

const reviews: Review[] = [
  {
    id: 1,
    name: "Jollof Rice",
    avatar: "https://i.pravatar.cc/150?u=21",
    email: "johndeo@gmail.com",
    review: "Lorem ipsum dolor sit amet",
    rating: 5,
  },
  {
    id: 2,
    name: "Fried Rice",
    avatar: "https://i.pravatar.cc/150?u=22",
    email: "johndeo@gmail.com",
    review: "Lorem ipsum dolor sit amet",
    rating: 4,
  },
  {
    id: 3,
    name: "Meat Pie",
    avatar: "https://i.pravatar.cc/150?u=23",
    email: "johndeo@gmail.com",
    review: "Lorem ipsum dolor sit amet",
    rating: 5,
  },
  {
    id: 4,
    name: "Fish Roll",
    avatar: "https://i.pravatar.cc/150?u=24",
    email: "johndeo@gmail.com",
    review: "Lorem ipsum dolor sit amet",
    rating: 5,
  },
  {
    id: 5,
    name: "Puff Puff",
    avatar: "https://i.pravatar.cc/150?u=25",
    email: "johndeo@gmail.com",
    review: "Lorem ipsum dolor sit amet",
    rating: 3,
  },
  {
    id: 6,
    name: "Fried Rice",
    avatar: "https://i.pravatar.cc/150?u=26",
    email: "johndeo@gmail.com",
    review: "Lorem ipsum dolor sit amet",
    rating: 4,
  },
];

const meta = {
  total: reviews.length,
  page: 1,
  limit: 10,
  totalPages: Math.ceil(reviews.length / 10),
};
