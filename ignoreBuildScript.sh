#!/bin/bash

# List of authorized GitHub usernames
AUTHORIZED_USERS="Michaelsulistio,ankur2136,emmett-solana,Funkatronics,J909,konoart,oliveeyay,sdlaver"

# Extract the GitHub username from the VERCEL_GIT_COMMIT_AUTHOR_LOGIN environment variable
COMMIT_AUTHOR=$VERCEL_GIT_COMMIT_AUTHOR_LOGIN


# Debugging: Print out relevant environment variables
echo "Debugging information:"
echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"
echo "VERCEL_GIT_COMMIT_AUTHOR_LOGIN: $VERCEL_GIT_COMMIT_AUTHOR_LOGIN"
echo "VERCEL_GIT_PULL_REQUEST_ID: $VERCEL_GIT_PULL_REQUEST_ID"




# Check if we're on the main branch (always build this)
if [[ "$VERCEL_GIT_COMMIT_REF" == "main" ]] ; then
  echo "✅ - Build can proceed"
  exit 1;
fi

# Check if the commit author is in the list of authorized users
if [[ $AUTHORIZED_USERS == *"$COMMIT_AUTHOR"* ]] ; then
  echo "✅ - Build can proceed: PR from authorized user"
  exit 1;
else
  echo "🛑 - Build cancelled: PR from unauthorized user"
  exit 0;
fi