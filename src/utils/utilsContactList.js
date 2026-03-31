const avatars = [
    "https://randomuser.me/api/portraits/men/1.jpg",
    "https://randomuser.me/api/portraits/women/2.jpg",
    "https://randomuser.me/api/portraits/men/3.jpg",
    "https://randomuser.me/api/portraits/women/4.jpg",
    "https://randomuser.me/api/portraits/men/5.jpg"
];
export const getImage = () => {
    const randomAvatarIndex = Math.floor(Math.random() * avatars.length)
    return avatars[
        randomAvatarIndex
    ]
}
