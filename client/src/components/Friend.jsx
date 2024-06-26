import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { useNavigate } from "react-router-dom";

const Friend = ({friendId, name, subtitle, userPicturePath}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {_id} = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);

    const {palette} = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;
    
    const isFriend = Boolean(friends.find((friend) => friend._id === friendId));
    // console.log(friendId);
    // console.log(friends);

    const patchFriend = async () => {
        // make call to add or remove friend depending on current friend status
        const response = await fetch(`http://localhost:3001/users/${_id}/${friendId}`,
        {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        const data = await response.json();
        // note we format the data as a list of friend objects which contain meta data such as id
        dispatch(setFriends({friends: data}));
    };

    return (
        <FlexBetween>
            <FlexBetween gap="1rem">
                <UserImage image={userPicturePath} size="55px"/>
                <Box>
                    <Typography
                        color={main}
                        variant="h5"
                        fontWeight="500"
                        sx={{
                            "&:hover": {
                                color: palette.primary.light,
                                cursor: "pointer"
                            }
                        }}
                        onClick={() => {
                            navigate(`/profile/${friendId}`);
                            //navigate(0); maybe need this https://stackoverflow.com/questions/68825965/react-router-v6-usenavigate-doesnt-navigate-if-replacing-last-element-in-path
                        }}
                    >
                        {name}
                    </Typography>
                    <Typography color={medium} fontSize="0.75rem">
                        {subtitle}
                    </Typography>
                </Box>
            </FlexBetween>
            {(_id !== friendId &&
                <IconButton
                    onClick={() => patchFriend()}
                    sx={{backgroundColor: primaryLight, p:"0.6rem"}}
                >
                    {isFriend? (
                        <PersonRemoveOutlined sx={{ color: primaryDark}} />
                    ): (
                        <PersonAddOutlined sx={{color: primaryDark}} />
                    )}
                </IconButton>
            )}
        </FlexBetween>
    )
};

export default Friend;