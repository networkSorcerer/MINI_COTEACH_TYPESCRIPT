import { Box, Typography } from "@mui/material";

interface CategoryCardProps {
  href: string;
  icons: string;
  name: string;
}

// 랜덤한 16진수 색상 코드를 생성하는 헬퍼 함수
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const CategoryCard = ({ href, icons, name }: CategoryCardProps) => {
  // 컴포넌트가 렌더링될 때마다 랜덤 색상 생성 (또는 필요에 따라 상태로 관리)
  const randomShadowColor = getRandomColor();

  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: 2,
        overflow: "hidden",
        // 기존 boxShadow를 제거하고 랜덤 색상으로 그림자 추가
        // 그림자 설정: 가로 오프셋, 세로 오프셋, 블러, 스프레드, 색상
        boxShadow: `0px 5px 15px 0px ${randomShadowColor}80`, // 80은 투명도 (RGBA의 A값 128/255)
        cursor: "pointer",
        transition: "box-shadow 0.3s ease-in-out", // 그림자 변화에 부드러운 전환 효과 추가
        "&:hover": {
          // 호버 시 그림자 강도를 높이거나 다른 색상으로 변경 가능
          boxShadow: `0px 8px 20px 0px ${randomShadowColor}BB`, // 더 진하게
        },
        "&:hover .play-button": {
          opacity: 1,
          transform: "scale(1)",
        },
      }}
    >
      <Typography>{name}</Typography>
      <img
        src={icons}
        alt={name}
        style={{ width: "100%", display: "block", height: "auto" }}
      />
    </Box>
  );
};

export default CategoryCard;
