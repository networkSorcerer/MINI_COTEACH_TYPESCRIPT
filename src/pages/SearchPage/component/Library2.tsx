import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { styled } from "@mui/material";
import useGetCurrentUserProfile from "../../../hooks/useGetCurrentUserProfile";
import EmptyPlaylist from "../../../layout/componenets/EmptyPlaylist";
import LoadingScreen from "../../../common/components/LoadingScreen";
import ErrorMessage from "../../../common/components/ErrorMessage";
import useGetCurrentUserPlaylists from "../../../hooks/useGetCurrentUserPlaylists";
import PlayList2 from "./Playlist2";

const StyledList = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
  overflowY: "auto",
  maxHeight: "600px",
  /* 스크롤바 숨기기 */
  /* 1) WebKit 기반 브라우저 (Chrome, Safari) */
  "&::-webkit-scrollbar": {
    display: "none",
  },
  /* 2) Firefox */
  scrollbarWidth: "none",
  /* 3) IE, Edge */
  "-ms-overflow-style": "none",
});
interface Library2Props {
  trackUri: string; // 부모로부터 trackUri를 받을 것이라고 명시
}
const Library2 = ({ trackUri }: Library2Props) => {
  const listRef = useRef<HTMLUListElement>(null);
  // rootElement를 스크롤 컨테이너로 지정
  const { ref: sentinelRef, inView } = useInView({
    root: listRef.current ?? undefined,
    rootMargin: "0px",
    threshold: 0.1,
  });
  console.log("Library2", trackUri);
  const {
    data,
    isLoading,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetCurrentUserPlaylists({
    limit: 10,
    offset: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);
  const { data: user } = useGetCurrentUserProfile();
  if (!user) return <EmptyPlaylist />;
  if (isLoading) return <LoadingScreen />;
  if (error) return <ErrorMessage errorMessage={error.message} />;

  const pages = data?.pages ?? [];
  const totalItems = pages[0]?.total ?? 0;
  if (totalItems === 0) return <EmptyPlaylist />;

  return (
    <StyledList ref={listRef}>
      {pages.map((page, pageIndex) =>
        page.items.map((pl) => (
          <PlayList2 trackUri2={trackUri} key={pl.id} playlists={[pl]} />
        ))
      )}
      {/* 스크롤 끝에서 이 div가 보이면 다음 페이지 로드 */}
      <li ref={sentinelRef} style={{ height: 1 }} />
      {isFetchingNextPage && (
        <li>
          <LoadingScreen />
        </li>
      )}
    </StyledList>
  );
};

export default Library2;
