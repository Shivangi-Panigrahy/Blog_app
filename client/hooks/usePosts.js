import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/api";

export const usePosts = (page = 1, limit = 10, search = "", userId = null) => {
  return useQuery({
    queryKey: ["posts", page, search, userId],
    queryFn: async () => {
      const { data } = await api.get("/posts", {
        params: { 
          page, 
          limit, 
          search,
          userId 
        },
      });
      return data;
    },
    keepPreviousData: true,
  });
};

export const usePost = (slug) => {
    return useQuery({
      queryKey: ['post', slug],
      queryFn: async () => {
        try {
          const { data } = await api.get(`/posts/${slug}`);
          return data;
        } catch (error) {
          throw new Error(`Failed to fetch post: ${error.message}`);
        }
      },
      enabled: !!slug,
    });
  };

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postData) => api.post("/posts", postData),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, postData }) => api.put(`/posts/${id}`, postData),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.delete(`/posts/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });
};
