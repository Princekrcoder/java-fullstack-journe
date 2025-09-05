import java.util.*;
public class CompareNumbers {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter first number: ");
        int num1 = sc.nextInt();
        
        System.out.print("Enter second number: ");
        int num2 = sc.nextInt();

        if(num1 == num2) {
            System.out.print("Both numbers are equal.");
        } else if(num1 > num2) {
                System.out.print("First number is greater.");
        }else {
                System.out.print("Second number is greater.");
         }
        sc.close();


    }
}
