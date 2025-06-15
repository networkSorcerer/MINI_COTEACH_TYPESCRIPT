import { Box } from "@mui/material";

interface CategoryCardProps {
  href: string;
  icons: string;
  name: string;
}
const CategoryCard = ({ href, icons, name }: CategoryCardProps) => {
  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: 3,
        cursor: "pointer",
        "&:hover .play-button": {
          opacity: 1,
          transform: "scale(1)",
        },
      }}
    >
      <img
        src={icons}
        alt={name}
        style={{ width: "100%", display: "block", height: "auto" }}
      />
    </Box>
  );
};

export default CategoryCard;
