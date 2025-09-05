 import java.util.*;

 public class AdultOrNot {
     public static void main(String[] args) {
         Scanner sc = new Scanner(System.in);
         System.out.print("Enter your age: ");
         int age = sc.nextInt();

         // Conditional Statement
         if (age >= 18) {
             System.out.println("You are an adult.");
         } else {
             System.out.println("You are not an adult.");
         }

         sc.close();
     }
 }