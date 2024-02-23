/* eslint-disable no-unused-vars */
const Button = (theme) => {
  return {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  };
};

export default Button;
