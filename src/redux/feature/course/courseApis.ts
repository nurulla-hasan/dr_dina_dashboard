import { baseApi } from "../../feature/baseApi";
import { tagTypes } from "../../tagTypes";
import { buildQueryParams } from "@/lib/utils";

const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAllCourses: builder.query({
      query: (query) => {
        const params = buildQueryParams(query);
        return {
          url: "/courses/all",
          method: "GET",
          params: params,
        };
      },
      providesTags: [tagTypes.course],
    }),

    createCourse: builder.mutation({
      query: (data) => ({
        url: "/courses/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.course],
    }),

    updateCourse: builder.mutation({
      query: ({ id, data }) => ({
        url: `/courses/update-info/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.course],
    }),

    assignTeacher: builder.mutation({
      query: ({ id, data }) => ({
        url: `/courses/assign-teacher/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.course],
    }),

    assignAssistant: builder.mutation({
      query: ({ id, data }) => ({
        url: `/courses/assign-assistant/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.course],
    }),

    addStudent: builder.mutation({
      query: ({ id, data }) => ({
        url: `/courses/add-students/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.course],
    }),

    removeStudent: builder.mutation({
      query: ({ id, data }) => ({
        url: `/courses/remove-students/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.course],
    }),

    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/courses/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.course],
    }),

    getTabularReport: builder.query({
      query: (courseId) => ({
        url: `/report/tabular-report/${courseId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.course],
    }),
    
  }),
});

export const {
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useAssignTeacherMutation,
  useAssignAssistantMutation,
  useAddStudentMutation,
  useRemoveStudentMutation,
  useDeleteCourseMutation,
  useGetAllCoursesQuery,
  useGetTabularReportQuery,
} = courseApi;
