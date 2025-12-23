import { Avatar, AvatarImage, AvatarFallback, AvatarGroup, AvatarBadge } from "@/components/ui/avatar";

/**
 * WexAvatar - WEX Design System Avatar Component
 *
 * Image element with fallback for representing users or entities.
 * Uses namespace pattern: WexAvatar.Image, WexAvatar.Fallback, WexAvatar.Group, WexAvatar.Badge
 *
 * @example
 * <WexAvatar>
 *   <WexAvatar.Image src="/profile.jpg" alt="John Doe" />
 *   <WexAvatar.Fallback>JD</WexAvatar.Fallback>
 * </WexAvatar>
 *
 * // With status badge
 * <WexAvatar>
 *   <WexAvatar.Image src="/profile.jpg" alt="John Doe" />
 *   <WexAvatar.Fallback>JD</WexAvatar.Fallback>
 *   <WexAvatar.Badge status="online" />
 * </WexAvatar>
 *
 * // Grouped avatars
 * <WexAvatar.Group max={3}>
 *   <WexAvatar><WexAvatar.Fallback>A</WexAvatar.Fallback></WexAvatar>
 *   <WexAvatar><WexAvatar.Fallback>B</WexAvatar.Fallback></WexAvatar>
 * </WexAvatar.Group>
 */

export const WexAvatar = Object.assign(Avatar, {
  Image: AvatarImage,
  Fallback: AvatarFallback,
  Group: AvatarGroup,
  Badge: AvatarBadge,
});

