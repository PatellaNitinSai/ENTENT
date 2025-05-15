export const hasAccess = (userRole, allowedRoles = []) => {
  return allowedRoles.includes(userRole);
};

export const redirectToRoleHome = (userRole) => {
  switch (userRole) {
    case 'Admin':
      return '/dashboard';
    case 'Inspector':
      return '/dashboard';
    case 'Engineer':
      return '/jobs';
    default:
      return '/login';
  }
};
