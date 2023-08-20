import { styled } from "styled-components/native";

export const Form = styled.View`
  width: 100%;
  flex: 1;
  padding: 10px 16px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Row = styled.View`
  width: 100%;
`;

export const Head = styled.View`
  width: 100%;
  padding: 15px 16px;
  background-color: ${({ theme }) => theme.colors.card};
  border-bottom-color: ${({ theme }) => theme.colors.disabled};
  border-bottom-width: 1px;
  margin-bottom: 10px;
  flex-direction: row;
  justify-content: flex-end;
`;

export const Body = styled.View`
  width: 100%;
  flex: 1;
  padding: 10px 16px;
`;

interface IconButtonProps {
	$error?: boolean;
}

export const IconButton = styled.TouchableOpacity<IconButtonProps>`
  width: 45px;
  height: 45px;
  background-color: ${({ theme }) => theme.colors.box};
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  border: 1px ${({ $error, theme }) =>
		$error ? theme.colors.error : "transparent"};
`;

interface ColorButtonProps {
	$value: string;
}

export const ColorBtn = styled.TouchableOpacity<ColorButtonProps>`
  width: 45px;
  height: 45px;
  background-color: ${({ $value }) => $value};
  justify-content: center;
  align-items: center;
  border-radius: 50px;
`;

export const Colum = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

export const Divider = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.disabled};
  margin: 20px 0;
`;

export const SendButton = styled.TouchableOpacity`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 20px;
  padding: 10px;
  align-items: center;
  margin-top: 25px;
`;
